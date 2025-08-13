export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | undefined;
  endCursor: string | undefined;
}
