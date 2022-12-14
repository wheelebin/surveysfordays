import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const MainNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const navItems = [{ label: "Home", route: "/" }];
  const secondaryNavItems = [
    {
      label: "Builder",
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
    <div className="border bg-white border-slate-200 text-black">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center">
          {navItems.map(({ label, route }) => (
            <Link key={label} href={route}>
              <div className="cursor-pointer py-1 px-1 w-full ">{label}</div>
            </Link>
          ))}
          {surveyId ? (
            <div className="ml-10 flex">
              <div className="text-xs font-thin py-1">{surveyId} / </div>

              {secondaryNavItems.map(({ label, route, pathName }) => (
                <Link key={route} href={route}>
                  <div className="text-xs cursor-pointer font-regular py-1 px-1">
                    {label}
                  </div>
                  {router.pathname === pathName ? (
                    <div className="w-full h-px bg-black"></div>
                  ) : undefined}
                </Link>
              ))}
            </div>
          ) : undefined}
        </div>
        <div>
          <div
            className="cursor-pointer py-1 px-1 w-full"
            onClick={() => signOut()}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavBar;
