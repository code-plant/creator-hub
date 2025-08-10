import { GraphQLSchema } from "graphql";
import { Logger } from "./shared/application/services/Logger";

export interface All {
  logger: Logger;
  graphqlSchema: GraphQLSchema;
}
