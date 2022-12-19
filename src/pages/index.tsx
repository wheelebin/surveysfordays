import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/AppButton";

const LadingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="mx-auto container grow-0 shrink basis-auto px-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">SurveysForDays</h3>
          <Link href="/api/auth/signin">
            <AppButton primary>Login</AppButton>
          </Link>
        </div>
      </div>
      <div className="mx-auto container grow shrink basis-auto px-5 ">
        <div className="mt-48 flex flex-col items-center justify-between lg:flex-row">
          <article className="w-full lg:w-1/2 mt-20 flex flex-col items-center lg:flex-row lg:block">
            <h1 className="text-5xl">
              Create surveys, forms and questionaries fast and easy for free
            </h1>
            <p className="text-xl mt-5">
              With SurveysForDays you can get up and running with a custom form
              that your audience actually want to answer without any cost.
            </p>
            <Link href="/api/auth/signin">
              <AppButton primary className="mt-10 py-5 px-8">
                Get started - It&apos;s free!
              </AppButton>
            </Link>
          </article>
          <div className="w-96 h-96 relative">
            <Image
              objectFit="contain"
              src="/logo.png"
              fill
              alt="Image of bear holding up a survey"
            />
          </div>
        </div>
      </div>
      <div className="bg-black text-white py-10">
        <div className="mx-auto container px-5">
          <span>Made by </span>
          <a href="https://github.com/wheelebin" className="text-green-200">
            @Wheelebin
          </a>
        </div>
      </div>
    </div>
  );
};

export default LadingPage;
