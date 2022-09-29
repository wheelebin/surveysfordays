import {
  PrismaClient,
  Prisma,
  Page,
  Section,
  Question,
  QuestionOption,
  Text,
  Image,
} from "@prisma/client";

const prisma = new PrismaClient();

const getUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const duplicate = <T>(
  itemMethod: (index: number) => T,
  amount?: number
): T[] => {
  // Will pick random amount of items to duplicate if amount is 0
  const items: T[] = [];
  const timesToRun = amount ? amount : getRandomNumber(2, 5);
  for (let i = 0; i < timesToRun; i++) {
    items.push(itemMethod(i));
  }
  return items;
};

export const initMock = () => {
  const survey = {
    id: getUUID(),
    title: "what are your favorite things",
    name: "Favorite things",
    description: "What are your favorite things?",
    startsAt: new Date("2022-01-01T00:00:00.000Z"),
    endsAt: new Date("2022-12-29T00:00:00.000Z"),
  };

  const pages = duplicate<Page>((index: number) => ({
    pageNumber: index + 1,
    id: getUUID(),
    surveyId: survey.id,
    createdAt: new Date(),
  }));

  // Setup pages and etc as well
  const sections: Section[] = [];
  pages.forEach((page) =>
    sections.push(
      ...duplicate<Section>((index: number) => ({
        pageId: page.id,
        id: getUUID(),
        sectionNumber: index + 1,
        createdAt: new Date(),
      }))
    )
  );

  const questions: Question[] = [];
  sections.forEach((section) =>
    questions.push(
      ...duplicate<Question>(() => ({
        id: getUUID(),
        sectionId: section.id,
        surveyId: section.id,
        text: "What is your favorite color?",
        createdAt: new Date(),
      }))
    )
  );

  const questionOptions: QuestionOption[] = [];
  questions.forEach((question) =>
    questionOptions.push(
      ...duplicate<QuestionOption>(() => ({
        id: getUUID(),
        questionId: question.id,
        type: "TEXT",
        text: "Blue",
        createdAt: new Date(),
      }))
    )
  );

  // TODO Add text & image creation to this method

  return {
    survey,
    pages,
    sections,
    questions,
    questionOptions,
  };
};

async function main() {
  const { survey, pages, sections, questions, questionOptions } = initMock();

  await prisma.survey.upsert({
    where: { id: survey.id },
    update: {},
    create: survey,
  });

  await Promise.any(
    pages.map((page) =>
      prisma.page.upsert({
        where: { id: page.id },
        update: {},
        create: page,
      })
    )
  );

  await Promise.any(
    sections.map((section) =>
      prisma.section.upsert({
        where: { id: section.id },
        update: {},
        create: section,
      })
    )
  );

  await Promise.any(
    questions.map((question) =>
      prisma.question.upsert({
        where: { id: question.id },
        update: {},
        create: question,
      })
    )
  );

  await Promise.any(
    questionOptions.map((questionOption) =>
      prisma.questionOption.upsert({
        where: { id: questionOption.id },
        update: {},
        create: questionOption,
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
