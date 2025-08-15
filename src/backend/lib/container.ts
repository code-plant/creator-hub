import { register } from "di-typed";
import { infrastructureRegistrations } from "../framework/infrastructure/infrastructureRegistrations";
import { sharedAllRegistration } from "../framework/sharedAllRegistration";
import { graphqlRegistrations } from "../graphql/graphqlRegistrations";

export const container = register({
  ...infrastructureRegistrations,
  ...sharedAllRegistration,
  ...graphqlRegistrations,
}).build();
