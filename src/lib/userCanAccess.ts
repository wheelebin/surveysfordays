import { prisma } from "../server/db/client";

export const userCanAccessSurvey = async (
  id: string,
  userId: string,
  status: "DRAFT" | "PUBLISH" = "DRAFT"
) => {
  const survey = await prisma.survey.findFirst({
    where: { id, userId, status },
  });
  if (!survey) {
    return null;
  }
  return survey;
};

export const userCanAccessQuestion = async (
  id: string,
  userId: string,
  status: "DRAFT" | "PUBLISH" = "DRAFT"
) => {
  const question = await prisma.question.findFirst({
    where: {
      id,
      status,
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
  userId: string,
  status: "DRAFT" | "PUBLISH" = "DRAFT"
) => {
  const questionOption = await prisma.questionOption.findFirst({
    where: {
      id,
      status,
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
