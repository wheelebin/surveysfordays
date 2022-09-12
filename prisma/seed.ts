import { PrismaClient } from "@prisma/client";
import { mockData } from "./mock";

const prisma = new PrismaClient();

const getUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const initMock = () => {
  const survey = { ...mockData.survey, id: getUUID() };
  const pages = mockData.pages.map((page) => ({
    ...page,
    id: getUUID(),
    surveyId: survey.id,
  }));

  // Setup pages and etc as well
};

async function main() {
  const survey = await prisma.survey.upsert({
    where: { id: "sxxxxxxxx" },
    update: {},
    create: {
      id: "sxxxxxxxx",
      title: "what are your favorite things",
      name: "Favorite things",
      description: "What are your favorite things?",
      startsAt: new Date("2022-01-01T00:00:00.000Z"),
      endsAt: new Date("2022-12-29T00:00:00.000Z"),
    },
  });

  const page = await prisma.page.upsert({
    where: { id: "pxxxxxxxx" },
    update: {},
    create: {
      id: "pxxxxxxxx",
      surveyId: survey.id,
      pageNumber: 1,
    },
  });

  const section = await prisma.section.upsert({
    where: { id: "pxxxxxxxx" },
    update: {},
    create: {
      id: "pxxxxxxxx",
      pageId: page.id,
      sectionNumber: 1,
    },
  });

  const question = await prisma.question.upsert({
    where: { id: "qxxxxxxxx" },
    update: {},
    create: {
      id: "qxxxxxxxx",
      surveyId: survey.id,
      sectionId: section.id,
      text: "What is your favorite color?",
    },
  });

  const questionOption = await prisma.questionOption.upsert({
    where: { id: "qpxxxxxxx" },
    update: {},
    create: {
      id: "qpxxxxxxx",
      questionId: question.id,
      type: "TEXT",
      text: "What is your favorite color?",
    },
  });
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
