# ParaBank Playwright Automation

End-to-end test automation framework built with **Playwright and TypeScript** for the ParaBank demo banking application.

[![Playwright Tests](https://github.com/devwanji/parabank-playwright/actions/workflows/parabank-playwright.yml/badge.svg)](https://github.com/devwanji/parabank-playwright/actions/workflows/parabank-playwright.yml)

## Overview

This project demonstrates a maintainable QA automation framework covering UI automation, API testing, network mocking, test data generation, cross-browser testing, debugging, and CI/CD.

The framework uses the **Page Object Model (POM)** and reusable Playwright fixtures to improve test organization, maintainability, and reusability.

## Technologies

- Playwright
- TypeScript
- Node.js
- Git and GitHub
- GitHub Actions
- REST API Testing
- Network Interception and Mocking
- Page Object Model
- Cross-Browser Testing

## Test Coverage

### UI Automation

- Login validation
- Registration form automation
- Dynamic test-data generation
- Account creation
- Funds transfer workflow
- Reusable Playwright fixtures

### API Testing

- GET, POST, PUT, PATCH and DELETE requests
- Response validation and headers
- Response-time validation
- Authentication testing
- Negative API scenarios
- Invalid endpoint handling

### API Mocking

- Successful API response mocking
- Simulated HTTP 500 server failures
- Controlled responses using Playwright routing

### Cross-Browser Testing

Regression tests executed across:

- Chromium
- Firefox
- WebKit

### Debugging and Reporting

- HTML test reports
- Screenshots on failure
- Video recording on failure
- Playwright traces

### CI/CD

GitHub Actions automatically executes:

- API tests
- Registration tests
- Cross-browser regression tests

The workflow is triggered by pushes to `main` and pull requests targeting `main`.

## Project Structure

```text
parabank-playwright/
├── .github/
│   └── workflows/
│       └── parabank-playwright.yml
├── auth/
│   ├── create-account.ts
│   └── setup.ts
├── fixtures/
│   ├── api.ts
│   ├── test.ts
│   └── testData.ts
├── pages/
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   └── TransferPage.ts
├── tests/
│   ├── api/
│   │   ├── auth.spec.ts
│   │   ├── mock-failure.spec.ts
│   │   ├── mocking.spec.ts
│   │   └── users.spec.ts
│   ├── example.spec.ts
│   ├── registration.spec.ts
│   └── transfer.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
├── playwright.api.config.ts
├── playwright.login.config.ts
├── playwright.registration.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/devwanji/parabank-playwright.git
```

Navigate into the project directory:

```bash
cd parabank-playwright
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### API Tests

```bash
npm run test:api
```

### Registration Tests

```bash
npm run test:registration
```

### Regression Tests

Run the tagged regression tests:

```bash
npm run test:regression -- --workers=1 --timeout=90000
```

### Cross-Browser Regression Tests

Run regression tests across Chromium, Firefox, and WebKit:

```bash
npm run test:regression:all
```

### View HTML Report

```bash
npm run test:report
```

## CI/CD

GitHub Actions automatically installs dependencies and Playwright browsers before executing the configured test suites.

The pipeline runs API, registration, and cross-browser regression tests.

**GitHub Actions:** [View workflow runs](https://github.com/devwanji/parabank-playwright/actions)

## Security

Sensitive authentication and environment files are excluded from version control through `.gitignore`.

These include:

- `.env`
- `auth/user.json`
- `auth/credentials.json`

## Application Under Test

[ParaBank Demo Banking Application](https://parabank.parasoft.com/parabank/)

## Author

**Terry Kariuki**

QA Automation | Playwright | TypeScript | API Testing

[GitHub](https://github.com/devwanji)
