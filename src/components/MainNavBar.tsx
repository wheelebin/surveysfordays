import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navItems = [{ label: "Home", route: "/" }];

const MainNavBar = () => {
  return (
    <div className="border bg-white border-slate-200 text-black">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center">
          {navItems.map(({ label, route }) => (
            <Link key={label} href={route}>
              <div className="cursor-pointer py-1 px-1 w-full ">{label}</div>
            </Link>
          ))}
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
