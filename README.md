## About
- This is a take home task as part of recruitment process for Kro

## How to setup Backend
- Clone the repo with `git clone <repo url>`
- Set up or connect with Postgress database
- Run `yarn start:dev` to start development server on local host `4002`

# Task Requirement Details

## Take-Home Task for Kro
### Overview
Please complete this task; It simulates a basic flow in a typical fintech app, so super relevant for what you’ll be doing day-to-day.

###  Description
You’re going to create an app that allows users to sign up (email + PW only), log in, and view a dashboard of financial transactions for that specific user. The backend should be built with Node.js.
Requirements

###  Backend
#### API Endpoints:
- Signup: Allows new users to create an account by providing an email, first name, last name, and a password. The user details should be stored in the database in a safe way.
- Login: Authenticates a user using email and password, and returns a JWT token.
- Transactions: Retrieves a list of financial transactions for the logged-in user. Each transaction should have the following fields: 
- id
- amount
- type (withdrawal / deposit)
- timestamp
- payment method
- user id

A sample mock data containing transactions will be linked to this task. Feel free to attach a payment method and some user ids to the transaction and use that.

### Database:
Please use PostgreSQL as your database. You can use Neon for free, or something else if you prefer
You’re free to design the database how you see fit. It must be proper and follow best practices.


### Submission Guidelines
- Submission is expected at most 72 hours after receiving this task.
Your submission should be a link to a GitHub repository containing your project. IMPORTANT: Please use different commits throughout the progress, and not just a single commit with everything. We need to see your planning process, and how you work in stages.
- Include a README file with instructions on how to set up and run the backend locally (incl. any necessary environment variables).
- Include a postman collection if possible so that the API can easily be tested
Ensure your code is clean and readable.
Automated tests are a bonus

Good luck!




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License
Nest is [MIT licensed](LICENSE).


