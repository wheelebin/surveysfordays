import AppButton from "@/components/AppButton";
import MainNavBar from "@/components/MainNavBar";
import AppCard from "@/components/AppCard";
import Link from "next/link";
import surveyApi from "@/api/survey";

const Survey = () => {
  const { data: surveys } = surveyApi.useGetAll();

  return (
    <div className="h-screen">
      <MainNavBar />
      <div className="container mx-auto">
        <div className="flex justify-center mt-5">
          <AppButton primary>Create survey</AppButton>
        </div>

        <div className="flex flex-row px-10">
          {surveys &&
            surveys.map((survey, i) => (
              <Link key={survey.id} href={`/builder/${survey.id}`}>
                <AppCard>
                  <div className="cursor-pointer py-5 px-2 w-full mt-2  font-semibold">
                    {survey.name}
                  </div>
                  <AppButton className="w-full">Go to</AppButton>
                </AppCard>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

Survey.auth = true;

export default Survey;
