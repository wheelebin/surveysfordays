import { prisma } from "src/server/db/client";

/* - Get current Survey, Questions & QuestionOptions
- Create or update Published versions of Survey, Questions, QuestionOptions */

enum SurveyStatus {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
}

export const publishSurvey = async (surveyId: string) => {
  const survey = await prisma.survey.findUnique({
    where: { id_status: { id: surveyId, status: "DRAFT" } },
    include: { Question: { include: { questionOptions: true } } },
  });

  if (!survey) {
    return null;
  }

  const questionsData = survey.Question.map(
    ({ id, type, surveyId, text, supportText, orderNumber }) => ({
      id,
      type,
      surveyId,
      text,
      supportText,
      orderNumber,
      status: SurveyStatus.PUBLISH,
      parentId: id,
    })
  );
  const questionOptionsData = survey.Question.flatMap(({ questionOptions }) =>
    questionOptions.map((questionOption) => questionOption)
  );

  await prisma.$transaction([
    prisma.survey.upsert({
      where: { id_status: { id: survey.id, status: "PUBLISH" } },
      update: {
        id: survey.id,
        name: survey.name,
        title: survey.title,
        description: survey.description,
        userId: survey.userId,
        status: "PUBLISH",
      },
      create: {
        id: survey.id,
        name: survey.name,
        title: survey.title,
        description: survey.description,
        userId: survey.userId,
        status: "PUBLISH",
      },
    }),
    ...questionsData.map((question) =>
      prisma.question.upsert({
        where: { id_status: { id: question.id, status: "PUBLISH" } },
        create: { ...question, status: "PUBLISH" },
        update: { ...question, status: "PUBLISH" },
      })
    ),
    ...questionOptionsData.map((questionOption) =>
      prisma.questionOption.upsert({
        where: { id_status: { id: questionOption.id, status: "PUBLISH" } },
        create: { ...questionOption, status: "PUBLISH" },
        update: { ...questionOption, status: "PUBLISH" },
      })
    ),
  ]);
};
