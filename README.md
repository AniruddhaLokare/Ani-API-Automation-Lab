# API Automation Testing Framework

A modular API automation testing framework developed using **Playwright and TypeScript** to validate RESTful API functionality, authentication, CRUD operations, and negative scenarios.

The framework uses the public [Restful Booker API](https://restful-booker.herokuapp.com/) as the application under test.

## Tech Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright
- **Runtime:** Node.js
- **API:** Restful Booker
- **Reporting:** Playwright HTML Reporter
- **Version Control:** Git & GitHub

## Framework Architecture

```text
Ani-API-Automation-Lab/
├── api/
│   └── clients/
│       ├── authClient.ts
│       └── bookingClient.ts
├── test-data/
│   └── bookingData.ts
├── tests/
│   └── api/
│       ├── auth.spec.ts
│       ├── createBooking.spec.ts
│       ├── getBooking.spec.ts
│       ├── updateBooking.spec.ts
│       ├── deleteBooking.spec.ts
│       └── negativeTests.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

_Test filenames should match the actual files in the repository._

## Test Coverage

| Test Scenario             | HTTP Method | Validation                         |
| ------------------------- | ----------- | ---------------------------------- |
| Valid authentication      | POST        | Token generation                   |
| Invalid authentication    | POST        | Invalid credentials response       |
| Create booking            | POST        | Booking creation and response data |
| Retrieve booking          | GET         | Booking details validation         |
| Update booking            | PUT         | Authenticated booking update       |
| Delete booking            | DELETE      | Authenticated booking deletion     |
| Invalid booking ID        | GET         | HTTP 404                           |
| Update with invalid token | PUT         | HTTP 403                           |
| Delete with invalid token | DELETE      | HTTP 403                           |

## Framework Features

- Reusable API client classes for authentication and booking operations
- Positive and negative API test scenarios
- API request and response validation
- Authentication token handling
- API chaining across CRUD operations
- Dynamic booking dates and reusable test data
- Test data cleanup using `try/finally`
- TypeScript static type checking
- Configurable Playwright test execution
- HTML test reports and failure traces

## Installation

**Prerequisites:** Node.js and npm installed.

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Ani-API-Automation-Lab
```

Install dependencies:

```bash
npm ci
```

## Running Tests

Execute all API tests:

```bash
npm run test:api
```

Validate TypeScript:

```bash
npm run typecheck
```

Open the Playwright HTML report after test execution:

```bash
npm run test:report
```

## API Test Workflow

Example authenticated booking update:

1. Create a booking using the POST endpoint.
2. Extract the booking ID from the response.
3. Generate an authentication token.
4. Update the booking using PUT.
5. Retrieve the booking using GET.
6. Validate the updated response data.
7. Delete the test booking during cleanup.

## Test Reporting

Playwright generates an HTML report containing test execution results, pass/fail status, and failure details.

The report can be opened locally using:

```bash
npm run test:report
```

## Future Enhancements

- GitHub Actions CI/CD integration
- Environment-based configuration
- Additional API validation scenarios
- Improved reporting and test diagnostics

## Author

**Aniruddha Lokare**

QA Automation Portfolio Project — Playwright + TypeScript
