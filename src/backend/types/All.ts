import { GraphQLSchema } from "graphql";
import { Logger } from "../framework/application/services/Logger";

export interface All {
  logger: Logger;
  graphqlSchema: GraphQLSchema;
}
