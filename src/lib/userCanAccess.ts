import { prisma } from "../server/db/client";

export const userCanAccessSurvey = async (id: string, userId: string) => {
  const survey = await prisma.survey.findFirst({
    where: { id, userId },
  });
  if (!survey) {
    return null;
  }
  return survey;
};

export const userCanAccessQuestion = async (id: string, userId: string) => {
  const question = await prisma.question.findFirst({
    where: {
      id,
      survey: {
        userId,
      },
    },
  });
  if (!question) {
    return null;
  }
  return question;
};

export const userCanAccessQuestionOption = async (
  id: string,
  userId: string
) => {
  const questionOption = await prisma.questionOption.findFirst({
    where: {
      id,
      question: {
        survey: {
          userId,
        },
      },
    },
  });
  if (!questionOption) {
    return null;
  }
  return questionOption;
};

// TODO Should also have a userCanEdit & maybe userCanDelete and implement in needed routes
