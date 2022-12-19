import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
import { AuthComponent } from "../types/authNextPage";
import { useSession } from "next-auth/react";

import {
  NextComponentType,
  AppContextType,
  AppInitialProps,
  AppPropsType,
} from "next/dist/shared/lib/utils";

export declare type AppTypee = NextComponentType<
  AppContextType,
  AppInitialProps,
  AppPropsType & { Component: AuthComponent }
>;

const MyApp: AppTypee = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

function Auth({ children }: { children: any }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return children;
}

export default trpc.withTRPC(MyApp);
