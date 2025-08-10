import { Config, create, objectType, resolver } from "gql-typed";

const Query = objectType<Config, {}>()({
  name: "Query",
});
const Mutation = objectType<Config, {}>()({
  name: "Mutation",
  fieldResolvers: {
    hello: resolver<string>()<Config, {}>()({
      resolve: () => "world",
      type: { type: "String" },
    }),
  },
});

export const { schema } = create()
  .register(Query, Mutation)
  .build({ Query: {}, Mutation: {} });
