import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/AppButton";

const LadingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="mx-auto container grow-0 shrink basis-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">SurveysForDays</h3>
          <Link href="/api/auth/signin">
            <AppButton primary>Login</AppButton>
          </Link>
        </div>
      </div>
      <div className="mx-auto container grow shrink basis-auto">
        <div className="mt-48 flex relative">
          <article className="w-1/2 mt-20">
            <h1 className="text-5xl">
              Create surveys, forms and questionaries fast and easy for free
            </h1>
            <p className="text-xl mt-5">
              With SurveysForDays you can get up and running with a custom form
              that your audience actually want to answer without any cost.
            </p>
            <Link href="/api/auth/signin">
              <AppButton primary className="py-5 px-8">
                Get started - It&apos;s free!
              </AppButton>
            </Link>
          </article>
          <Image
            src="/logo.png"
            height={500}
            width={500}
            alt="Image of bear holding up a survey"
          />
        </div>
      </div>
      <div className="bg-black text-white py-10">
        <div className="mx-auto container">
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
