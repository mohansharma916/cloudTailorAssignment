<p align="center">
  <a href="https://www.cloudtailor.com/" target="blank"><img src="https://images-static.cloudtailor.com/ct-h-logo.svg" width="200" alt="Cloud Tailor Logo" /></a>
</p>

  <p align="center">A Simple Server Based on  <a href="https://nestjs.com/" target="_blank">NestJS + Fastify </a>  building Faster, efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[CloudTailor Contact Management Server](https://github.com/mohansharma916/cloudTailorAssignment.git) This project is a contact management server built using NestJS with Fastify as the HTTP server, GraphQL for the API, and Prisma for the ORM and database management. It supports full CRUD operations on a Contact table.
## Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (>=14.x.x)
2. npm (comes with Node.js) or yarn
3. Prisma CLI: Install globally with npm install -g prisma


## Installation

Follow these steps to set up the project locally:

# 1. Clone the repository:

```bash
git clone https://github.com/yourusername/cloudtailor-contact-management.git
cd cloudtailor-contact-management
```
# 2. Install dependencies:

```bash
# Using Npm 
$ npm install

# Or using yarn:
$ yarn add
```

# 3. Environment variables:
 Create a .env file in the root directory and add your database connection string. For example:

 ```bash
DATABASE_URL="postgresql://user:password@localhost:5432/contactdb"

```

## Database Setup:
1. Run Prisma migrations to set up the database schema:

 ```bash
npx prisma migrate dev --name init

```

```bash
npx prisma db push
```
This command will apply the migrations and create the Contact table in your database.

2. Generate Prisma client:

```bash
npx prisma generate

```

This will generate the Prisma client to interact with the database.


## Running the Server

To start the server, use one of the following commands:

```bash
# development
 npm run start

or

yarn start

```

The server will start on port 3000 by default. If you want to run the server in development mode with hot-reloading, use:

```bash
npm run start:dev

```

## GraphQL Playground

Once the server is running, you can access the GraphQL Playground at http://localhost:3000/graphql to interact with your GraphQL API. Use this playground to test queries, mutations


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Deployment

To deploy this application, follow these steps:

1. Build the project:

```bash
npm run build

```
This will compile the TypeScript files into JavaScript.



2. Run The Server

-    Use a process manager like PM2 or Docker for running the server in production.

   With PM2:

   ```bash
   pm2 start dist/main.js
   ```

- With Docker:
    Create a Dockerfile:

  ```bash
   FROM node:16

   WORKDIR /app

  COPY package.json ./
  COPY package-lock ./

  RUN npm install

  COPY . .

  RUN npm run build

  EXPOSE 3000

  CMD ["node", "dist/main"]

  ```


  Build and run the Docker container:


  ```bash
  docker build -t contact-management .
  docker run -p 3000:3000 --env-file .env contact-management

  ```

# Deployment Considerations:

Cloud Platforms: Deploy the Docker container to cloud platforms like AWS, GCP, or Azure.
Kubernetes: For scaling and orchestration, consider deploying to a Kubernetes cluster.



## Scalability Strategy

1. Horizontal Scaling :
-   Use Kubernetes to deploy multiple instances of the application. This allows the application to handle more requests by distributing the load across multiple instances.
-   Employ a load balancer (like AWS ELB or NGINX) to distribute incoming requests evenly across these instances.

2. Database Optimization:
-   Use a managed database service that supports scaling, such as AWS RDS or Google Cloud SQL.
-   Implement database sharding if the data volume grows significantly.

3. Caching:

-  Implement caching strategies using services like Redis or Memcached to reduce database load for frequently accessed data.




## Stay in touch

- Author - [Mohan Sharma]

