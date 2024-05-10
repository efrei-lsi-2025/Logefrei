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

## Usage

The application will be available at http://localhost
