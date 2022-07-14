import { sharedResolver, sharedSchema, createGraphQLServer } from "@fivestars/shared";

export const schema = /* GraphQL */`
  type Query {
      foo: String!
  }
`

export const resolvers = {
  Query: {
    foo: () => 'bar'
  }
}

const port = +(process.env.PORT || 4000);

createGraphQLServer({
  port,
  resolvers: [resolvers, sharedResolver],
  schemas: [schema, sharedSchema]
});
process.on("warning", (e) => console.warn(e.stack));