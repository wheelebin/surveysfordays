// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { surveyRouter } from "./survey";
import { pageRouter } from "./page";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("survey.", surveyRouter)
  .merge("page.", pageRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
