# Functional tests

The main purpose ot these tests is to check from the end user's perspective that the system is behaving as expected. Please note that they
simulate the real user scenarios and verify the all system components integrates correctly at a high level. These tests use both functional
and [visual](https://percy.io/visual-testing) testing approaches:

- [Cypress](https://www.cypress.io/) is for functional testing
- [Percy](https://docs.percy.io/docs/cypress) is for visual testing

### Prerequisites

The only requirement for this project is to have [Node.js](https://nodejs.org/en/) **version 14** installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.

## How to run locally?

All you need is to run the command

```bash
npm run dev
```

to be able to manage every single test or

```bash
npm run test
```

to run all tests in the background.

> For local testing all Percy commands are skipped. It is critical to relay on Cypress tests, treating visual tests as some additional
> testing layer, however, all critical business scenarios should contain checks in Cypress.

The architecture for running Cypress locally looks like below:

![Running functional tests locally](../docs/diagrams/generated/websight-e2e-testing-local.png)

## How to add new tests?

Install all required dependencies and run auto formatter:

```bash
npm install
npm run format:watch
```

Now you can run Cypress in a separate terminal:

```bash
npm run dev
```

add the new functional test in the `tests` folder.

Before you commit your changes please run:

```bash
npm run format
npm run test
```

## What scenarios are covered?

### Redirection after login

By default, the user should be redirected to `/apps/websight/index.html/content::spaces`. However, once user visited another resource and was
redirected to the login page, then after logging in, use this location.

Resource: `tests/authentication.spec.ts`

### Restricting access to admin tools

Anonymous users are not allowed to view admin tools. If the user is not logged in, he is redirected to the login page and then redirected
back to the requested resource. Depending on the resource, the user should see content for logged-in users.

Resource: `tests/authentication.spec.ts`

## How to run in CI?

![Running functional tests in CI](../docs/diagrams/generated/websight-e2e-testing-ci.png)

## References

- [E2E Functional and Visual Testing for the Web](https://www.youtube.com/watch?v=MXfZeE9RQDw)
