import { router } from "../trpc";

import { surveyRouter } from "./survey";
import { questionRouter } from "./question";
import { questionOptionRouter } from "./questionOption";
import { submissionRouter } from "./submission";

export const appRouter = router({
  survey: surveyRouter,
  question: questionRouter,
  questionOption: questionOptionRouter,
  submission: submissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
