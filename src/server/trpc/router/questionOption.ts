import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  userCanAccessQuestion,
  userCanAccessQuestionOption,
} from "src/lib/userCanAccess";

export const questionOptionRouter = router({
  add: protectedProcedure
    .input(
      z.array(
        z.object({
          questionId: z.string(),
          type: z.string(),
          label: z.string(),
          placeholder: z.string().optional(),
          supportText: z.string().optional(),
          orderNumber: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const result = await Promise.all(
        input.map(async (questionOption) => {
          if (
            !(await userCanAccessQuestion(
              questionOption.questionId,
              ctx.session.user.id
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
    }),
  edit: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          label: z.string().optional(),
          placeholder: z.string().optional().nullable(),
          supportText: z.string().optional().nullable(),
          orderNumber: z.number().optional(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const result = await Promise.all(
        input.map(async (questionOption) => {
          if (
            !(await userCanAccessQuestionOption(
              questionOption.id,
              ctx.session.user.id
            ))
          ) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }
          return ctx.prisma.questionOption.update({
            where: { id: questionOption.id },
            data: questionOption,
          });
        })
      );
      return result;
    }),
  getAllByQuestionId: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (
        !(await userCanAccessQuestion(input.questionId, ctx.session.user.id))
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.questionOption.findMany({
        where: { questionId: input.questionId, status: "DRAFT" },
        orderBy: [{ orderNumber: "asc" }],
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await userCanAccessQuestionOption(input.id, ctx.session.user.id))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.questionOption.delete({
        where: { id: input.id },
      });
    }),
  getAllPublishedByQuestionId: publicProcedure
    .input(
      z.object({
        questionId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.questionId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return await ctx.prisma.questionOption.findMany({
        where: {
          questionId: input.questionId,
        },
      });
    }),
});
