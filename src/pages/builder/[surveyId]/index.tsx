import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import AppButton from "../../../components/AppButton";
import Builder from "../../../components/Builder";

const BuilderPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const { data: survey_ } = trpc.useQuery([
    "survey.byId",
    { id: surveyId as string },
  ]);

  const survey = {
    id: "0",
    name: "Test survey",
    title: "Test survey",
    description: "Test survey",
    startsAt: new Date(),
    endsAt: new Date(),
  };

  const page = {
    id: "0",
    surveyId: "0",
    pageNumber: 1,
  };

  const section = {
    id: "0",
    pageId: page.id,
    sectionNumber: 1,
  };

  const question = {
    id: "0",
    surveyId: survey?.id,
    sectionId: section.id,
    text: "What is your name?",
  };

  const questionOption = {
    id: "0",
    questionId: question?.id,
    type: "TEXT",
    orderNumber: 1,
  };

  return (
    <div className="container mx-auto mt-2">
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex justify-center items-center">
              1
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 my-2">
            <div id="section">
              <div id="question">
                <h1>{question.text}</h1>
              </div>
              <div id="questionOptions">
                <input className="w-full" type="text" />
              </div>
            </div>

            <div className="flex justify-center">
              <AppButton>Add section</AppButton>
            </div>
          </div>

          <div className="flex justify-center">
            <AppButton>Add page</AppButton>
          </div>
        </div>
        <div className="ml-20 w-1/3">
          <Builder />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
