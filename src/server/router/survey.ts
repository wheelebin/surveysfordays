import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const surveyRouter = createRouter()
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
        data: input,
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
      const survey = await ctx.prisma.survey.update({
        where: { id: input.id },
        data: input,
      });
      if (!survey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No survey with id ${input.id}`,
        });
      }
      return survey;
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.survey.findMany();
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.survey.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.survey.findUnique({ where: { id: input.id } });
    },
  });
