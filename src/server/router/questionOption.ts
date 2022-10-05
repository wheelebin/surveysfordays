import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// Create a question option
// Delete a question option
// Edit a question option

export const questionOptionRouter = createRouter()
  .mutation("add", {
    input: z.array(
      z.object({
        questionId: z.string(),
        type: z.string(),
        label: z.string(),
        placeholder: z.string().optional(),
        supportText: z.string().optional(),
        orderNumber: z.number(),
      })
    ),
    async resolve({ input, ctx }) {
      const result = await Promise.all(
        input.map((questionOption) =>
          ctx.prisma.questionOption.create({
            data: questionOption,
          })
        )
      );
      return result;
    },
  })
  .mutation("edit", {
    input: z.array(
      z.object({
        id: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional().nullable(),
        supportText: z.string().optional().nullable(),
        orderNumber: z.number().optional(),
      })
    ),
    async resolve({ input, ctx }) {
      const result = await Promise.all(
        input.map((questionOption) =>
          ctx.prisma.questionOption.update({
            where: { id: questionOption.id },
            data: questionOption,
          })
        )
      );
      return result;
    },
  })
  .query("getAllByQuestionId", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.questionOption.findMany({
        where: { questionId: input.questionId },
        orderBy: [{ orderNumber: "asc" }],
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.questionOption.delete({
        where: { id: input.id },
      });
    },
  });
