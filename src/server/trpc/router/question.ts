import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessSurvey,
} from "src/lib/userCanAccess";
import { runPrompt } from "src/lib/questionsCreator";

export const questionRouter = router({
  generateQuestionsForSurveyId: protectedProcedure
    .input(
      z.object({
        surveyId: z.string(),
        description: z.string(),
        numberOfQuestions: z.number(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const questionExamples = await runPrompt(
        input.numberOfQuestions,
        input.description,
        input.tags
      );

      if (!questionExamples) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const questions = questionExamples.map(({ question, options }, i) => ({
        question: {
          surveyId: input.surveyId,
          type: "RADIO",
          text: question,
          supportText: "Add some support text here",
          orderNumber: i,
        },
        options,
      }));

      const newQuestions = await Promise.all(
        questions.map(async (question) =>
          ctx.prisma.question.create({
            data: {
              ...question.question,
              questionOptions: {
                createMany: {
                  data: question.options.map((option, i) => ({
                    type: "RADIO",
                    label: option,
                    orderNumber: i,
                  })),
                },
              },
            },
          })
        )
      );

      return newQuestions;
    }),
  add: protectedProcedure
    .input(
      z.object({
        surveyId: z.string(),
        type: z.string(),
        text: z.string().optional(),
        supportText: z.string().optional().nullable(),
        orderNumber: z.number().optional(),
        questionOptions: z
          .array(
            z.object({
              type: z.string(),
              label: z.string().optional(),
              placeholder: z.string().optional(),
              supportText: z.string().optional(),
              orderNumber: z.number().optional(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dummyQuestionData = {
        text: "Change me :)",
        supportText: "Some support text",
        orderNumber: 0,
      };

      const questionOptions = input.questionOptions?.length
        ? input.questionOptions?.map((questionOption) => ({
            ...{
              label: "Change me :)",
              placeholder: "Some placeholder",
              supportText: "Some support text for the input element",
              orderNumber: 0,
            },
            ...questionOption,
          }))
        : [
            {
              label: "Change me :)",
              placeholder: "Some placeholder",
              supportText: "Some support text for the input element",
              orderNumber: 0,
              type: input.type,
            },
          ];

      return await ctx.prisma.question.create({
        data: {
          ...dummyQuestionData,
          ...input,
          status: "DRAFT",
          questionOptions: { createMany: { data: questionOptions || [] } },
        },
        include: { questionOptions: true },
      });
    }),
  editQuestion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().optional(),
        supportText: z.string().optional().nullable(),
        type: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await userCanAccessQuestion(
        input.id,
        ctx.session.user.id
      );
      if (!question) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.question.update({
        data: {
          text: input.text,
          supportText: input.supportText,
          type: input.type,
        },
        where: { id: input.id },
      });
    }),
  editQuestionsOrderNumber: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          orderNumber: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      // TODO Change how this works, feels odd to check and update work in loops

      const result = await Promise.all(
        input.map(async (question) => {
          if (
            !(await userCanAccessQuestion(question.id, ctx.session.user.id))
          ) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }

          return ctx.prisma.question.update({
            where: { id: question.id },
            data: question,
          });
        })
      );
      return result;
    }),
  getAllBySurveyId: protectedProcedure
    .input(
      z.object({
        surveyId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.question.findMany({
        where: {
          surveyId: input.surveyId,
          status: "DRAFT",
          survey: {
            userId: {
              equals: ctx.session.user.id,
            },
          },
        },
        include: {
          questionOptions: {
            orderBy: { orderNumber: "asc" },
          },
        },
        orderBy: [{ orderNumber: "asc" }],
      });
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!(await userCanAccessQuestion(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessQuestion(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // TODO  DO I need this, don't I cascade on delete?
      await ctx.prisma.questionOption.deleteMany({
        where: { questionId: input.id },
      });
      return await ctx.prisma.question.delete({
        where: { id: input.id },
      });
    }),
  getAllPublishedBySurveyId: publicProcedure
    .input(
      z.object({
        surveyId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.surveyId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return await ctx.prisma.question.findMany({
        where: { surveyId: input.surveyId, status: "PUBLISH" },
        include: {
          questionOptions: {
            orderBy: { orderNumber: "asc" },
          },
        },
        orderBy: [{ orderNumber: "asc" }],
      });
    }),
});
