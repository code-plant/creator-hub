# Directory Structure for `src/modules`

Each directory is a subdomain which contains directories for bounded context, or shared kernel (`shared`).

Each bound context has directory structure like:

- `application/` - Application services.
- `domain/` - Domain models and services.
- `graphql/` - GraphQL schema and resolvers.
- `infrastructure/` - Infrastructure services.
- `README.md` - README file for the bound context.
