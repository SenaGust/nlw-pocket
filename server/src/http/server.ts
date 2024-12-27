import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import fastifyCors from "@fastify/cors";
import { getWeekPendingGoals } from "../services/goals/get-week-pending-goals";
import { createCompletionRoute } from "./routes/create-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createCompletionRoute);

app.get("/pending-goals", async () => {
  const { pendingGoals } = await getWeekPendingGoals();

  return { pendingGoals };
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
