import { NextPage, NextComponentType, NextPageContext } from "next";

type AuthComponentConfig = {
  auth?: boolean;
};

export type AuthNextPage = NextPage & AuthComponentConfig;

export type AuthComponent = NextComponentType<
  NextPageContext,
  any,
  Record<string, never>
> &
  Partial<AuthComponentConfig>;
