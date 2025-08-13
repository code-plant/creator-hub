import { Edge } from "./Edge";
import { PageInfo } from "./PageInfo";

export interface Connection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}
