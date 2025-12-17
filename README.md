<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS PostgreSQL Boilerplate

A robust tailored [NestJS](https://github.com/nestjs/nest) boilerplate integrated with PostgreSQL, Knex, and Objection.js. This starter project comes pre-configured with essential auditing, logging, and security features to kickstart your backend development.

## Features

- **Database**: PostgreSQL integration using [Knex.js](https://knexjs.org/) (Query Builder) and [Objection.js](https://vincit.github.io/objection.js/) (ORM).
- **Configuration**: Centralized configuration management using `@nestjs/config` and `.env` files.
- **Logging**: Advanced logging with [Winston](https://github.com/winstonjs/winston).
- **Security**: Security best practices with [Helmet](https://helmetjs.github.io/) and CORS.
- **Validation**: Request data validation using `class-validator` and `class-transformer`.
- **Testing**: Pre-configured Jest for Unit and E2E testing.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) (or npm/pnpm)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd nest-postgres-boilerplate
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Configuration

Copy the example environment file to create your local `.env` file:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and other configuration:

```bash
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database_name

# API Configuration
PORT=3000
API_PREFIX=api
```

### 4. Database Setup

Ensure your PostgreSQL service is running and the database specified in `.env` exists.

#### Run Migrations

To set up the database schema:

```bash
yarn run migrate:latest
```

#### Run Seeds (Optional)

To populate the database with initial data:

```bash
yarn run seed:run
```

## Running the Application

```bash
# development
yarn run start

# watch mode
yarn run dev

# production mode
yarn run start:prod
```

## Database Management

Common commands for managing database migrations and seeds:

- **Create a new migration**:
  ```bash
  yarn run migrate:make <migration_name>
  ```
- **Run migrations**:
  ```bash
  yarn run migrate:latest
  ```
- **Rollback last migration**:
  ```bash
  yarn run migrate:rollback
  ```
- **Check migration status**:
  ```bash
  yarn run migrate:status
  ```
- **Create a new seed**:
  ```bash
  yarn run seed:make <seed_name>
  ```
- **Run seeds**:
  ```bash
  yarn run seed:run
  ```

## Testing

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## License

This project is [UNLICENSED](LICENSE).
