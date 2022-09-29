import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const pageRouter = createRouter()
  .mutation("add", {
    input: z.object({
      surveyId: z.string(),
      pageNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.page.create({
        data: input,
      });
    },
  })
  .mutation("editPageNumber", {
    input: z.object({
      id: z.string(),
      pageNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
      const page = await ctx.prisma.page.update({
        where: { id: input.id },
        data: input,
      });
      if (!page) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No page with id ${input.id}`,
        });
      }
      return page;
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.page.findMany();
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.page.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.page.delete({ where: { id: input.id } });
    },
  });
