import { create, objectType, resolver } from "gql-typed";
import { Config } from "./Config";

const Query = objectType<Config, {}>()({
  name: "Query",
  fieldResolvers: {
    hello: resolver<string>()<Config, {}>()({
      resolve: () => "world",
      type: { type: "String" },
    }),
  },
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

export const { schema } = create<Config>()
  .register(Query, Mutation)
  .build({ Query: {}, Mutation: {} });
