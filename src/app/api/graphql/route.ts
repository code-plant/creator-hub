import {
  execute,
  getOperationAST,
  NoSchemaIntrospectionCustomRule,
  parse,
  specifiedRules,
  validate,
  type ExecutionResult,
} from "graphql";
import { container } from "../container";
import { createRequestContext } from "../createRequestContext";
import { Context } from "./Context";
import { schema } from "./schema";

// export const runtime = "nodejs";

interface GraphQLRequest {
  query?: string;
  variables?: Record<string, unknown>;
  operationName?: string | null;
}

const isDev = process.env.NODE_ENV === "development";

async function handle(req: Request): Promise<Response> {
  try {
    let body: GraphQLRequest = {};
    if (req.method === "GET") {
      const url = new URL(req.url);
      body.query = url.searchParams.get("query") ?? undefined;
      body.operationName = url.searchParams.get("operationName");
      const vars = url.searchParams.get("variables");
      body.variables = coerceVars(vars);
    } else if (req.method === "POST") {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const json = await req.json();
        body = {
          query: json.query,
          variables: coerceVars(json.variables),
          operationName: json.operationName,
        };
      } else if (contentType.includes("application/graphql")) {
        body = { query: await req.text() };
      } else {
        return json(
          { errors: [{ message: "Unsupported Content-Type" }] },
          { status: 415 }
        );
      }
    } else {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const query = body.query?.toString();
    if (!query) {
      return json(
        { errors: [{ message: "Must provide query string." }] },
        { status: 400 }
      );
    }

    let document;
    try {
      document = parse(query);
    } catch (err: any) {
      return json({ errors: [formatErr(err)] }, { status: 400 });
    }

    if (req.method === "GET") {
      const op = getOperationAST(document, body.operationName || undefined);
      if (op && op.operation !== "query") {
        return json(
          { errors: [{ message: "Can only perform query operation via GET" }] },
          { status: 405 }
        );
      }
    }

    const rules = isDev
      ? specifiedRules
      : [...specifiedRules, NoSchemaIntrospectionCustomRule];

    const validationErrors = validate(schema, document, rules);
    if (validationErrors.length > 0) {
      return json({ errors: validationErrors.map(formatErr) }, { status: 400 });
    }

    const contextValue: Context = {
      container,
      requestContext: await createRequestContext(req),
    };

    const result: ExecutionResult = await execute({
      schema,
      document,
      variableValues: coerceVars(body.variables),
      operationName: body.operationName || undefined,
      contextValue,
    });

    // You may want stricter status mapping; this keeps it simple.
    return json(result, { status: 200, noStore: true });
  } catch (err: any) {
    return json({ errors: [formatErr(err)] }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

// --- helpers ---

function coerceVars(v: unknown): Record<string, unknown> | undefined {
  if (v == null) return undefined;
  if (typeof v === "string") {
    if (v.trim() === "") return undefined;
    try {
      return JSON.parse(v);
    } catch {
      // fall through; let graphql error at runtime if types mismatch
      return undefined;
    }
  }
  if (typeof v === "object") return v as Record<string, unknown>;
  return undefined;
}

function formatErr(e: unknown) {
  if (typeof e === "object" && e && "message" in e)
    return e as { message: string };
  return { message: String(e) };
}

function json(
  data: unknown,
  opts?: { status?: number; noStore?: boolean }
): Response {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
  });
  if (opts?.noStore) headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), {
    status: opts?.status ?? 200,
    headers,
  });
}
