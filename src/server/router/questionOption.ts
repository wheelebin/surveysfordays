import { createRouter } from "./context";
import { createProtectedRouter } from "./protectedRouter";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessQuestionOption,
} from "src/lib/userCanAccess";
import { TRPCError } from "@trpc/server";

export const questionOptionRouter = createProtectedRouter()
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
        input.map(async (questionOption) => {
          if (
            !(await userCanAccessQuestion(
              questionOption.questionId,
              ctx.userId
            ))
          ) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }
          return ctx.prisma.questionOption.create({
            data: questionOption,
          });
        })
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
        input.map(async (questionOption) => {
          if (
            !(await userCanAccessQuestionOption(questionOption.id, ctx.userId))
          ) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }
          ctx.prisma.questionOption.update({
            where: { id: questionOption.id },
            data: questionOption,
          });
        })
      );
      return result;
    },
  })
  .query("getAllByQuestionId", {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!(await userCanAccessQuestion(input.questionId, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
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
      if (!(await userCanAccessQuestionOption(input.id, ctx.userId))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.questionOption.delete({
        where: { id: input.id },
      });
    },
  });
