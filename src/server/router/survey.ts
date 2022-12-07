import { createRouter } from "./context";
import { createProtectedRouter } from "./protectedRouter";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { userCanAccessSurvey } from "src/lib/userCanAccess";

export const surveyRouterPrivate = createProtectedRouter()
  .mutation("add", {
    input: z.object({
      name: z.string(),
      title: z.string(),
      description: z.string(),
      startsAt: z.date(),
      endsAt: z.date(),
    }),
    async resolve({ input, ctx }) {
      const survey = await ctx.prisma.survey.create({
        data: { ...input, userId: ctx.userId },
      });
      return survey;
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      startsAt: z.date().optional(),
      endsAt: z.date().optional(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessSurvey(input.id, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.survey.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.survey.findMany({
        where: { userId: ctx.userId },
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const survey = await userCanAccessSurvey(input.id, ctx.userId);
      if (!survey) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return survey;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessSurvey(input.id, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.survey.delete({ where: { id: input.id } });
    },
  });

export const surveyRouterPublic = createRouter().query(
  "getPublishedSurveyById",
  {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const survey = await ctx.prisma.survey.findUnique({
        where: { id: input.id },
      });
      if (!survey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No survey with id ${input.id}`,
        });
      }

      // Check if survey is published
      // This is for users who are going to answer the surveys

      return survey;
    },
  }
);

export const surveyRouter = createRouter()
  .merge(surveyRouterPrivate)
  .merge(surveyRouterPublic);
