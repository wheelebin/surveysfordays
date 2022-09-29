import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const sectionRouter = createRouter()
  .mutation("add", {
    input: z.object({
      pageId: z.string(),
      sectionNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.section.create({
        data: input,
      });
    },
  })
  .mutation("editSectionNumber", {
    input: z.object({
      id: z.string(),
      sectionNumber: z.number(),
    }),
    async resolve({ input, ctx }) {
      const section = await ctx.prisma.section.update({
        where: { id: input.id },
        data: input,
      });
      if (!section) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No section with id ${input.id}`,
        });
      }
      return section;
    },
  })
  .query("getAllByPageId", {
    input: z.object({
      pageId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.section.findMany({
        where: { pageId: input.pageId },
        orderBy: [{ sectionNumber: "asc" }],
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.section.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.section.delete({ where: { id: input.id } });
    },
  });
