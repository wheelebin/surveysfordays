// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { surveyRouter } from "./survey";
import { pageRouter } from "./page";
import { sectionRouter } from "./section";
import { questionRouter } from "./question";
import { questionOptionRouter } from "./questionOption";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("survey.", surveyRouter)
  .merge("page.", pageRouter)
  .merge("section.", sectionRouter)
  .merge("question.", questionRouter)
  .merge("questionOption.", questionOptionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
