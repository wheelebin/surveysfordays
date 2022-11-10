import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// Create a question with or without question options
// Get a question and all it's question options
// Edit question text
// Delete question and all of it's question options

export const questionRouter = createRouter()
  .mutation("add", {
    input: z.object({
      surveyId: z.string(),
      type: z.string(),
      text: z.string(),
      supportText: z.string().optional().nullable(),
      orderNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
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
      const question = await ctx.prisma.question.update({
        where: { id: input.id },
        data: input,
      });
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No question with id ${input.id}`,
        });
      }
      return question;
    },
  })
  .query("getAllBySurveyId", {
    input: z.object({
      surveyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.question.findMany({
        where: { surveyId: input.surveyId },
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
      return await ctx.prisma.question.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.questionOption.deleteMany({
        where: { questionId: input.id },
      });
      return await ctx.prisma.question.delete({ where: { id: input.id } });
    },
  });
