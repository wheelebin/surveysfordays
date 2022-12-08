import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "./protectedRouter";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessSurvey,
} from "src/lib/userCanAccess";

export const questionRouter = createProtectedRouter()
  .mutation("add", {
    input: z.object({
      surveyId: z.string(),
      type: z.string(),
      text: z.string(),
      supportText: z.string().optional().nullable(),
      orderNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.question.create({
        data: input,
      });
    },
  })
  .mutation("editQuestion", {
    input: z.object({
      id: z.string(),
      text: z.string().optional(),
      supportText: z.string().optional().nullable(),
      type: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const question = await userCanAccessQuestion(input.id, ctx.userId);
      if (!question) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.question.update({
        data: {
          text: input.text,
          supportText: input.supportText,
          type: input.type,
        },
        where: { id_status: { id: input.id, status: "DRAFT" } },
      });
    },
  })
  .mutation("editQuestionsOrderNumber", {
    input: z.array(
      z.object({
        id: z.string(),
        orderNumber: z.number(),
      })
    ),
    async resolve({ input, ctx }) {
      // TODO Change how this works, feels odd to check and update work in loops

      const result = await Promise.all(
        input.map(async (question) => {
          if (!(await userCanAccessQuestion(question.id, ctx.userId))) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }

          return ctx.prisma.question.update({
            where: { id_status: { id: question.id, status: "DRAFT" } },
            data: question,
          });
        })
      );
      return result;
    },
  })
  .query("getAllBySurveyId", {
    input: z.object({
      surveyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.question.findMany({
        where: {
          surveyId: input.surveyId,
          status: "DRAFT",
          survey: {
            userId: {
              equals: ctx.userId,
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
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessQuestion(input.id, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.question.findUnique({
        where: { id_status: { id: input.id, status: "DRAFT" } },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessQuestion(input.id, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // TODO  DO I need this, don't I cascade on delete?
      await ctx.prisma.questionOption.deleteMany({
        where: { questionId: input.id },
      });
      return await ctx.prisma.question.delete({
        where: { id_status: { id: input.id, status: "DRAFT" } },
      });
    },
  });
