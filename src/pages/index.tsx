import AppButton from "@/components/AppButton";
import MainNavBar from "@/components/MainNavBar";
import AppCard from "@/components/AppCard";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import surveyApi from "@/api/survey";

const Survey = () => {
  const router = useRouter();
  const { data: surveys } = surveyApi.useGetAll();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/api/auth/signin");
    }
  }, [status, session]);

  return (
    <div>
      <MainNavBar />
      <div className="container mx-auto">
        <div className="flex justify-center mt-5">
          <AppButton>Create survey</AppButton>
        </div>

        <div className="flex flex-row">
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

export default Survey;
