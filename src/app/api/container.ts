import { register } from "di-typed";
import { graphqlRegistrations } from "./graphql/graphqlRegistrations";

export const container = register({
  ...graphqlRegistrations,
}).build();
