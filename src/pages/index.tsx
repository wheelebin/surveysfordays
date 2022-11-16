import { trpc } from "@/utils/trpc";
import AppButton from "@/components/AppButton";
import AppNavBar from "@/components/AppNavBar";
import Link from "next/link";

const Survey = () => {
  const { data: surveys } = trpc.useQuery(["survey.getAll"]);

  return (
    <div>
      <AppNavBar />
      <div className="container mx-auto">
        <div className="flex justify-center mt-5">
          <AppButton>Create survey</AppButton>
        </div>
        <div className="flex flex-row">
          {surveys &&
            surveys.map((survey, i) => (
              <Link key={survey.id} href={`/builder/${survey.id}`}>
                <div className="cursor-pointer py-5 px-2 w-full mt-2 text-indigo-500 font-semibold">
                  {survey.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Survey;
