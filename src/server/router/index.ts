// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { surveyRouter } from "./survey";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("survey.", surveyRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
