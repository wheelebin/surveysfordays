import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessSurvey,
} from "src/lib/userCanAccess";

export const questionRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        surveyId: z.string(),
        type: z.string(),
        text: z.string().optional(),
        supportText: z.string().optional().nullable(),
        orderNumber: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dummyData = {
        text: "Change me :)",
        supportText: "Some support text",
      };

      return await ctx.prisma.question.create({
        data: { ...dummyData, ...input, status: "DRAFT" },
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
      });
    }),
});
