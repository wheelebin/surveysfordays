import { publishSurvey } from "src/lib/publishHandler";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { userCanAccessSurvey } from "src/lib/userCanAccess";

export const surveyRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        startsAt: z.date(),
        endsAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.survey.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        startsAt: z.date().optional(),
        endsAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.survey.update({
        where: { id: input.id },
        data: input,
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.survey.findMany({
      where: { userId: ctx.session.user.id, status: "DRAFT" },
    });
  }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        published: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const survey = ctx.prisma.survey.findFirst({
        where: { userId: ctx.session.user.id },
        include: {
          Question: {
            orderBy: { orderNumber: "asc" },
            include: {
              questionOptions: {
                orderBy: { orderNumber: "asc" },
              },
            },
          },
        },
      });

      return survey;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.survey.delete({
        where: { id: input.id },
      });
    }),
  publish: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessSurvey(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await publishSurvey(input.id);
    }),
  getPublishedSurveyById: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const survey = await ctx.prisma.survey.findUnique({
        where: { parentId: input.id },
        include: {
          Question: {
            include: {
              questionOptions: true,
            },
          },
        },
      });
      if (!survey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No survey with id ${input.id}`,
        });
      }

      return survey;
    }),
});
