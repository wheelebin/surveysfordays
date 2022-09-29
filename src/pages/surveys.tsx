import { trpc } from "../utils/trpc";
import AppButton from "../components/AppButton";

const Survey = () => {
  const { data: surveys } = trpc.useQuery(["survey.getAll"]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-5">
        <AppButton>Create survey</AppButton>
      </div>
      <div className="flex flex-row">
        {surveys &&
          surveys.map((survey, i) => (
            <div
              key={survey.id}
              className="py-5 px-2 w-full mt-2 text-indigo-500 font-semibold"
            >
              {survey.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Survey;
