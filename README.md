# ParaBank Playwright Automation

End-to-end test automation framework built with **Playwright and TypeScript** for the ParaBank demo banking application.

[![Playwright Tests](https://github.com/devwanji/parabank-playwright/actions/workflows/parabank-playwright.yml/badge.svg)](https://github.com/devwanji/parabank-playwright/actions/workflows/parabank-playwright.yml)

## Overview

This project demonstrates a maintainable QA automation framework covering UI automation, API testing, network mocking, test data generation, cross-browser testing, debugging, and CI/CD.

The framework uses the **Page Object Model (POM)** and reusable Playwright fixtures.

## Technologies

- Playwright
- TypeScript
- Node.js
- Git and GitHub
- GitHub Actions
- REST API testing
- Network interception and mocking
- Page Object Model
- Cross-browser testing

## Test Coverage

### UI Automation

- Login validation
- Registration form automation
- Dynamic test-data generation
- Account creation
- Transfer funds workflow
- Reusable Playwright fixtures

### API Testing

- GET, POST, PUT, PATCH and DELETE requests
- Response validation and headers
- Response-time validation
- Authentication testing
- Negative API scenarios

### API Mocking

- Successful API response mocking
- Simulated HTTP 500 server failures
- Controlled responses using Playwright routing

### Cross-Browser Testing

- Chromium
- Firefox
- WebKit

### Debugging and Reporting

- HTML reports
- Screenshots on failure
- Video recording on failure
- Playwright traces

### CI/CD

GitHub Actions automatically executes:

- API tests
- Registration tests
- Cross-browser regression tests

Triggered by pushes to `main` and pull requests targeting `main`.

## Project Structure

```text
parabank-playwright/
|-- .github/
|   |-- workflows/
|       |-- parabank-playwright.yml
|-- auth/
|   |-- create-account.ts
|   |-- setup.ts
|-- fixtures/
|   |-- api.ts
|   |-- test.ts
|   |-- testData.ts
|-- pages/
|   |-- LoginPage.ts
|   |-- RegisterPage.ts
|   |-- TransferPage.ts
|-- tests/
|   |-- api/
|   |   |-- auth.spec.ts
|   |   |-- mock-failure.spec.ts
|   |   |-- mocking.spec.ts
|   |   |-- users.spec.ts
|   |-- example.spec.ts
|   |-- registration.spec.ts
|   |-- transfer.spec.ts
|-- .gitignore
|-- package.json
|-- playwright.config.ts
|-- playwright.api.config.ts
|-- playwright.login.config.ts
|-- playwright.registration.config.ts
|-- README.md
```

## Getting Started

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

### Run API Tests

```bash
npx playwright test --config=playwright.api.config.ts
```

### Run Registration Tests

```bash
npx playwright test --config=playwright.registration.config.ts --timeout=90000
```

### Run Regression Tests

```bash
npx playwright test --config=playwright.login.config.ts --grep "@regression"
```

### Run Regression Tests Across All Browsers

```bash
npx playwright test --config=playwright.login.config.ts --grep "@regression" --workers=3 --timeout=90000
```

### View HTML Report

```bash
npx playwright show-report
```

## CI/CD

GitHub Actions automatically installs dependencies and browsers, then executes the configured test suites.

**Latest CI pipeline: Passing**

## Security

Sensitive authentication and environment files are excluded from version control:

- `.env`
- `auth/user.json`
- `auth/credentials.json`

## Application Under Test

[ParaBank Demo Banking Application](https://parabank.parasoft.com/parabank/)

## Author

**Terry Kariuki**

QA Automation | Playwright | TypeScript | API Testing
