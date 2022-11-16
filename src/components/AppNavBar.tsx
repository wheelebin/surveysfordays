import React from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", route: "/" },
  { label: "Results", route: "/" },
];

const AppNavBar = () => {
  return (
    <div className="border border-slate-200">
      <div className="container mx-auto flex justify-between py-5">
        <div className="flex items-center">
          {navItems.map(({ label, route }) => (
            <Link key={label} href={route}>
              <div className="cursor-pointer py-2 px-2 w-full text-indigo-500 font-semibold">
                {label}
              </div>
            </Link>
          ))}
        </div>
        <div>
          <div className="cursor-pointer py-2 px-2 w-full text-indigo-500 font-semibold">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavBar;
