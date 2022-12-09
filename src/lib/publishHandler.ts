import { prisma } from "src/server/db/client";

/* - Get current Survey, Questions & QuestionOptions
- Create or update Published versions of Survey, Questions, QuestionOptions */

enum SurveyStatus {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
}

export const publishSurvey = async (surveyId: string) => {
  // TODO Room for refactoring/improvment?
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

  const result = await prisma.$transaction([
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

  // Cleanup, remove any deleted questions and/or questionOptions

  const publishedSurvey = await prisma.survey.findUnique({
    where: { id_status: { id: surveyId, status: "PUBLISH" } },
    include: { Question: { include: { questionOptions: true } } },
  });

  if (!publishedSurvey) {
    return null;
  }

  publishedSurvey.Question.forEach(async ({ id }) => {
    const obj = questionsData.find((draftQuestion) => draftQuestion.id === id);

    if (!obj) {
      const res = await prisma.question.delete({
        where: { id_status: { id, status: "PUBLISH" } },
      });
    }
  });
  publishedSurvey.Question.flatMap(({ questionOptions }) =>
    questionOptions.map(async ({ id }) => {
      const obj = questionOptionsData.find(
        (draftQuestionOption) => draftQuestionOption.id === id
      );

      if (!obj) {
        await prisma.questionOption.delete({
          where: { id_status: { id, status: "PUBLISH" } },
        });
      }
    })
  );
};
