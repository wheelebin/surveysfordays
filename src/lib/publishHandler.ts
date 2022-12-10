import { prisma } from "src/server/db/client";

/* - Get current Survey, Questions & QuestionOptions
- Create or update Published versions of Survey, Questions, QuestionOptions */

enum SurveyStatus {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
}

export const publishSurvey = async (surveyId: string) => {
  // TODO Room for refactoring/improvment?
  const survey = await prisma.survey.findFirst({
    where: { id: surveyId, status: "DRAFT" },
    include: {
      Question: {
        where: { status: "DRAFT" },
        include: {
          questionOptions: {
            where: { status: "DRAFT" },
          },
        },
      },
    },
  });

  if (!survey) {
    return null;
  }

  const questionsData = survey.Question.map(
    ({
      id,
      type,
      surveyId,
      text,
      supportText,
      orderNumber,
      questionOptions,
    }) => ({
      id,
      type,
      surveyId,
      text,
      supportText,
      orderNumber,
      status: SurveyStatus.PUBLISH,
      parentId: id,
      questionOptions,
    })
  );

  const questionOptionsData = survey.Question.flatMap(
    ({ id, questionOptions }) =>
      questionOptions.map((questionOption) => ({
        ...questionOption,
        questionId: id,
      }))
  );

  const publishedSurvey_ = await prisma.survey.upsert({
    where: { parentId: survey.id },
    create: {
      name: survey.name,
      title: survey.title,
      description: survey.description,
      userId: survey.userId,
      status: "PUBLISH",
      parentId: survey.id,
    },
    update: {
      name: survey.name,
      title: survey.title,
      description: survey.description,
      userId: survey.userId,
      status: "PUBLISH",
    },
  });

  const publishedQuestions = await Promise.all(
    questionsData.map((question) =>
      prisma.question.upsert({
        where: { parentId: question.parentId },
        include: {
          questionOptions: {
            where: { status: "DRAFT" },
          },
        },
        create: {
          type: question.type,
          surveyId: publishedSurvey_.id,
          text: question.text,
          supportText: question.supportText,
          orderNumber: question.orderNumber,
          parentId: question.id,
          status: "PUBLISH",
        },
        update: {
          type: question.type,
          text: question.text,
          supportText: question.supportText,
          orderNumber: question.orderNumber,
        },
      })
    )
  );

  const a = await questionOptionsData.reduce((res, curr) => {
    return res;
  }, []);

  const questionsOptions = await questionOptionsData.reduce(
    async (newArr, questionOption) => {
      const publishedQuestion = await prisma.question.findFirst({
        where: { parentId: questionOption.questionId },
      });

      if (!publishedQuestion) {
        return await newArr;
      }

      return [
        ...(await newArr),
        {
          ...questionOption,
          questionId: publishedQuestion.id,
        },
      ];
    },
    Promise.resolve([]) as Promise<any[]>
  );

  console.log(questionsOptions);

  questionsOptions.forEach(async (questionOption) => {
    await prisma.questionOption.upsert({
      where: { parentId: questionOption.id },
      create: {
        questionId: questionOption.questionId,
        type: questionOption.type,
        label: questionOption.label,
        placeholder: questionOption.placeholder,
        supportText: questionOption.supportText,
        value: questionOption.value,
        orderNumber: questionOption.orderNumber,
        parentId: questionOption.id,
        status: "PUBLISH",
      },
      update: {
        type: questionOption.type,
        label: questionOption.label,
        placeholder: questionOption.placeholder,
        supportText: questionOption.supportText,
        value: questionOption.value,
        orderNumber: questionOption.orderNumber,
      },
    });
  });

  // Cleanup, remove any deleted questions and/or questionOptions

  const publishedSurvey = await prisma.survey.findFirst({
    where: { parentId: survey.id },
    include: { Question: { include: { questionOptions: true } } },
  });

  if (!publishedSurvey) {
    return null;
  }

  publishedSurvey.Question.forEach(async ({ id, parentId }) => {
    const obj = questionsData.find(
      (draftQuestion) => draftQuestion.id === parentId
    );

    if (!obj) {
      const res = await prisma.question.delete({
        where: { id },
      });
    }
  });
  publishedSurvey.Question.flatMap(({ questionOptions }) =>
    questionOptions.map(async ({ id, parentId }) => {
      const obj = questionOptionsData.find(
        (draftQuestionOption) => draftQuestionOption.id === parentId
      );

      if (!obj) {
        await prisma.questionOption.delete({
          where: { id },
        });
      }
    })
  );
};
