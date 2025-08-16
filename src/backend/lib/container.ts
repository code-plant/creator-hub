import { register } from "di-typed";
import { sharedAllRegistrations } from "../framework/sharedAllRegistrations";
import { graphqlRegistrations } from "../graphql/graphqlRegistrations";
import { authAllRegistrations } from "../modules/auth/authAllRegistrations";
import { ownershipAllRegistrations } from "../modules/ownership/ownershipAllRegistrations";

export const container = register(
  // framework, shared infrastructure
  sharedAllRegistrations
)
  .register({
    // auth
    ...authAllRegistrations,
    ...ownershipAllRegistrations,
  })
  .register({
    // application
    ...graphqlRegistrations,
  })
  .build();
