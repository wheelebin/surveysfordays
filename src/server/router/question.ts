import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "./protectedRouter";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessSurvey,
} from "src/lib/userCanAccess";

const questionRouterPrivate = createProtectedRouter()
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
      console.log(input);
      return await ctx.prisma.question.create({
        data: { ...input, status: "DRAFT" },
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
        where: { id: input.id },
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
            where: { id: question.id },
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
        where: { id: input.id },
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
        where: { id: input.id },
      });
    },
  });

const questionRouterPublic = createRouter().query("getAllPublishedBySurveyId", {
  input: z.object({
    surveyId: z.string().nullish(),
  }),
  async resolve({ input, ctx }) {
    if (!input.surveyId) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
    return await ctx.prisma.question.findMany({
      where: { surveyId: input.surveyId, status: "PUBLISH" },
    });
  },
});
/* .query("getAllBySurveyId", {
    input: z.object({
      surveyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessSurvey(input.surveyId, ctx.session?.user.id))) {
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
  }); */

export const questionRouter = createRouter()
  .merge(questionRouterPrivate)
  .merge(questionRouterPublic);
