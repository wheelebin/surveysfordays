import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const sectionRouter = createRouter()
  .mutation("add", {
    input: z.object({
      surveyId: z.string(),
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
  .mutation("edit", {
    input: z.array(
      z.object({
        id: z.string(),
        sectionNumber: z.number(),
      })
    ),
    async resolve({ input, ctx }) {
      const result = await Promise.all(
        input.map((section) =>
          ctx.prisma.section.update({
            where: { id: section.id },
            data: section,
          })
        )
      );
      return result;
    },
  })
  .query("getAllBySurveyId", {
    input: z.object({
      surveyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      // TODO Maybe create seperate query for the include or have a "withQuestions" param
      return await ctx.prisma.section.findMany({
        where: { surveyId: input.surveyId },
        include: { questions: true },
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
