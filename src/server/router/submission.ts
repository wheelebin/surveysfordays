import { promise, z } from "zod";
import { createRouter } from "./context";

export const submissionRouter = createRouter().mutation("submit", {
  input: z.object({
    surveyId: z.string(),
    userId: z.string().nullable(),
    answers: z.array(
      z.object({
        questionOptionIds: z.array(z.string()),
      })
    ),
  }),
  async resolve({ ctx, input }) {
    const submission = await ctx.prisma.submission.create({
      data: {
        surveyId: input.surveyId,
        userId: input.userId,
      },
    });

    // TODO This stuff should be a transaction
    input.answers.forEach(async ({ questionOptionIds }) => {
      const answer = await ctx.prisma.answer.create({
        data: { submissionId: submission.id },
      });
      await ctx.prisma.answer_QuestionOption.createMany({
        data: questionOptionIds.map((questionOptionId) => ({
          answerId: answer.id,
          questionOptionId,
        })),
      });
    });
  },
});
/* .query("getAllBySurveyId", {
    input: z.object({ surveyId: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.submission.findMany({
        where: {
          surveyId: input.surveyId,
        },
        include: {
          Answer: {
            include: {
              questionOptions: {
                // select: {}, TODO I won't need all data so specify here
                include: {
                  question: true,
                },
              },
            },
          },
        },
      });
    },
  }); */

/* ctx.prisma.answer.findMany({
      where: { questionOptionIds: { hasEvery: ["", ""] } },
    }); */
