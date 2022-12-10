// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { surveyRouter } from "./survey";
import { pageRouter } from "./page";
import { questionRouter } from "./question";
import { questionOptionRouter } from "./questionOption";
import { submissionRouter } from "./submission";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("survey.", surveyRouter)
  .merge("page.", pageRouter)
  .merge("question.", questionRouter)
  .merge("questionOption.", questionOptionRouter)
  .merge("submissionRouter", submissionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
