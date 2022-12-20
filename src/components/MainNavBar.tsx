import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import Avatar from "boring-avatars";
import AppDropdown from "./AppDropdown";
import AppDropdownItem from "./AppDropdownItem";

const MainNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  const { initials, user } = useUser();

  const navItems = [{ label: "Home", route: "/surveys" }];
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
      <div className="container mx-auto flex justify-between items-center py-2 px-10">
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
          <AppDropdown
            trigger={
              <div className="rounded-md overflow-hidden relative flex items-center justify-center">
                <span className="absolute text-white font-bold">
                  {initials}
                </span>
                <Avatar
                  size={40}
                  square={true}
                  name={user?.id}
                  variant="marble"
                  colors={["#295270", "#524175", "#2b0948"]}
                ></Avatar>
              </div>
            }
          >
            <AppDropdownItem label="Logout" onClick={() => signOut()} />
          </AppDropdown>
        </div>
      </div>
    </div>
  );
};

export default MainNavBar;
