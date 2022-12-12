import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AppNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const navItems = [
    {
      label: "Build",
      route: `/builder/${surveyId}`,
      pathName: "/builder/[surveyId]",
    },
    {
      label: "Results",
      route: `/results/${surveyId}`,
      pathName: "/results/[surveyId]",
    },
  ];

  return (
    <div className="border-bottom bg-white border-slate-200 text-black text-sm">
      <div className="container mx-auto flex justify-between items-center pt-1">
        <div className="flex items-center">
          {navItems.map(({ label, route, pathName }) => (
            <Link key={label} href={route}>
              <div className="cursor-pointer py-2 px-1 w-full ">{label}</div>
              {router.pathname === pathName ? (
                <div className="w-full h-px bg-black"></div>
              ) : undefined}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppNavBar;
