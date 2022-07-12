import { sharedResolver, sharedSchema, createGraphQLServer } from "@fivestars/shared";
import { schema } from "./app/schema";
import { resolvers } from "./app/resolvers";

const port = +(process.env.PORT || 4000);

createGraphQLServer({
  port,
  resolvers: [resolvers, sharedResolver],
  schemas: [schema, sharedSchema]
});
process.on("warning", (e) => console.warn(e.stack));