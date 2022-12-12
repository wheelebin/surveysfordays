import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import type { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
