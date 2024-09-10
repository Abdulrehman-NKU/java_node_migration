<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description
/**
 * This app is a project management application that helps in organizing and managing projects and teams.
 * It provides features to create, track, and update projects, as well as manage teams and their tasks.
 * With this app, users can efficiently collaborate, assign tasks, set deadlines, and monitor the progress of their projects.
 * It aims to streamline the project management process and enhance productivity for individuals and teams.
 */

## Installation

```bash
# Installing dependencies
$ npm install

# Environment setup
$ Setup the env as mentioned .env.example

# Database Setup
$ npx prisma migrate deploy

# Insert initial data
$ npm i ts-node --global
$ npx ts-node prisma/seeders/seed_fun_api.ts

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
