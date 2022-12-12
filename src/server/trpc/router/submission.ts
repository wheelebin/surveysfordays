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

      if (!questions) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      // TODO Take a look at this mess and improve it

      const transformedQuestions = questions.reduce((prev, curr) => {
        curr.Answer.forEach((answer) => {
          prev[answer.submissionId] = {
            ...prev[answer.submissionId],
            [answer.questionId]: answer.text
              ? [answer.text]
              : answer.Answer_QuestionOption.map((a) => {
                  return a.questionOption.label;
                }),
          };
        });

        return prev;
      }, {}) as {
        [key: string]: {
          [key: string]: string | undefined;
        };
      };

      const fullyPopulatedQuestions = Object.entries(transformedQuestions).map(
        ([_, value]) => {
          questions.forEach((question) => {
            if (value[question.id] === undefined) {
              value[question.id] = undefined;
            }
          });
          return value;
        }
      );

      const header = questions.map((question) => ({
        text: question.text,
        id: question.id,
      })) as { text: string; id: string }[];

      const dataRows = fullyPopulatedQuestions.map((question) =>
        header.map((header) => {
          return question[header.id];
        })
      ) as [string][];

      return { header, data: dataRows };
    }),
});
