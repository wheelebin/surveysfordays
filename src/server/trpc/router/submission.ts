import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const submissionRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        surveyId: z.string(),
        userId: z.string().nullable(),
        answers: z.array(
          z.object({
            questionId: z.string(),
            questionOptionIds: z.array(z.string()),
            text: z.string().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.prisma.submission.create({
        data: {
          surveyId: input.surveyId,
          userId: input.userId,
        },
      });

      // TODO This stuff should be a transaction
      input.answers.map(async ({ questionOptionIds, text, questionId }) => {
        const stuffs = questionOptionIds.map((answerOption) => ({
          questionOptionId: answerOption,
        }));

        const answer = await ctx.prisma.answer.create({
          data: {
            submissionId: submission.id,
            text,
            questionId,
            Answer_QuestionOption: !text
              ? {
                  createMany: { data: stuffs },
                }
              : {},
          },
        });
        console.log(answer);
      });
    }),
  getAllBySurveyId: protectedProcedure
    .input(z.object({ surveyId: z.string() }))
    .query(async ({ ctx, input }) => {
      const questions = await ctx.prisma.question.findMany({
        where: { survey: { parentId: input.surveyId } },
        include: {
          Answer: {
            include: {
              submission: true,
              Answer_QuestionOption: {
                include: {
                  questionOption: true,
                },
              },
            },
          },
        },
      });

      const submissions = await ctx.prisma.submission.findMany({
        where: { survey: { parentId: input.surveyId } },
        include: {
          Answer: {
            include: {
              question: true,
              Answer_QuestionOption: {
                include: { questionOption: true },
              },
            },
          },
        },
      });

      if (!questions) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const header = questions.map((question) => ({
        text: question.text,
        id: question.id,
      }));

      const data = submissions.map((item) => {
        return {
          submissionId: item.id,
          answers: questions.map((question) => {
            const answer = item.Answer.find(
              (answer) => answer.questionId === question.id
            );

            const answerText = answer?.text
              ? [{ label: answer.text }]
              : undefined;

            const answerValues = !!answer?.Answer_QuestionOption.length
              ? answer?.Answer_QuestionOption.map((option) => ({
                  label: option.questionOption.label,
                }))
              : undefined;

            return {
              questionId: question.id,
              values: answerText || answerValues || [{ label: undefined }],
            };
          }),
        };
      }) as {
        submissionId: string;
        answers: {
          questionId: string;
          values: {
            label: string | undefined;
          }[];
        }[];
      }[];

      return { header, data };
    }),
});
