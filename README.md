# Logefrei

## Pre-requisites

- Docker + Docker Compose 2.22.0 minimum
- Docker connection to GHCR registry (see [GHCR documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic))
- Bun (`powershell -c "irm bun.sh/install.ps1|iex"`)

## Installation

1. Clone the repository
2. Copy the .env.example file to .env and fill the variables
3. Run `bun install` in `./back` and `./front` folders
4. Run the following command to start the application:

```bash
docker compose -f docker-compose.dev.yml up --watch --build
```

5. Once Postgres is up, run `bun run prisma:dev:apply` in the `./back` folder to apply the migrations

## Usage

The application will be available at http://localhost

## Database Operations

### Migrating the database

Once you made a change to the database schema, you need to create a new migration.
To do so, your dev environment must be up & you have to run the following command in the `./back` folder:

```bash
bun run prisma:dev:migrate
```

The docker compose watcher should automatically restart all the services.

### Open Studio

> ℹ️ Prisma Studio is the official database UI for Prisma. It allows to view & edit the data inside the Postgres database.

To open the Prisma Studio, run the following command in the `./back` folder:

```bash
bun run prisma:dev:studio
```

The studio should open itself up in your default browser.
