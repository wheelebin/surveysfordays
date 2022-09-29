import { createContextInner } from "./context";
import { appRouter } from ".";
import { inferMutationInput } from "../../utils/trpc";

test("add and get post", async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferMutationInput<"survey.add"> = {
    title: "hello test",
    name: "hello test",
    description: "hello test",
    startsAt: new Date(),
    endsAt: new Date(),
  };
  const survey = await caller.mutation("survey.add", input);
  const byId = await caller.query("survey.byId", {
    id: survey.id,
  });

  expect(byId).toMatchObject(input);
});
