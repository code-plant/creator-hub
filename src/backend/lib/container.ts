import { register } from "di-typed";
import { sharedAllRegistration } from "../framework/sharedAllRegistration";
import { graphqlRegistrations } from "../graphql/graphqlRegistrations";

export const container = register({
  ...sharedAllRegistration,
  ...graphqlRegistrations,
}).build();
