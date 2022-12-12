import { trpc } from "@/utils/trpc";
import AppButton from "@/components/AppButton";
import AppNavBar from "@/components/AppNavBar";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Survey = () => {
  const router = useRouter();
  const { data: surveys } = trpc.survey.getAll.useQuery();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/api/auth/signin");
    }
  }, [status, session]);

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
