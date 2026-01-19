# QA Engineer Assessment - Privilee Website Automation

This project contains automated tests for the Privilee website map page and JSONPlaceholder API endpoints as part of a QA engineering assessment.

## Test Coverage

### API Tests (4 endpoints)
- GET /users - User data validation (JSONPlaceholder)
- GET /posts - Post data validation (JSONPlaceholder)
- GET /users/1/posts - User-specific posts (JSONPlaceholder)
- GET /todos - Todo data validation (JSONPlaceholder)

### Web Tests (7 scenarios)
1. **Map page loads** - Basic page loading validation
2. **Join button exists and links to signup** - Button functionality
3. **Map container exists** - Map component presence
4. **Venue widgets have text and photos** - Widget content validation
5. **Filters are clickable** - Filter functionality
6. **Quick filters match actual filters** - Data accuracy
7. **Search bar exists and returns results for Zabeel** - Search functionality

## How to Run Tests

### Setup & Run
```bash
npm install
npx playwright install  # Install browser for web tests
npm test               # Runs both API and Web tests
```

### Run Tests Separately
```bash
npm run test:api       # API tests only
npm run test:api:retry # API tests with retry logic (3 attempts)
npm run test:web       # Web tests only
```

## Test Results

After running tests, check:
- **HTML Report**: `playwright-report/index.html` (open in browser)
- **JSON Results**: `test-results/results.json`
- **API Console Output**: Shows pass/fail status in terminal

## Project Structure

```
QA-Auto/
├── collections/
│   └── collection.json        # Newman API test collection
├── tests/
│   └── privilee-map.spec.js   # Playwright web tests
├── .github/
│   └── workflows/
│       └── test.yaml          # CI/CD workflow
├── retry-api-tests.js         # API test retry logic
├── playwright.config.js       # Browser configuration
├── package.json              # Dependencies and scripts
└── README.md                # This file
```

## Technologies

- **API Testing**: Newman (Postman CLI) with retry logic
- **Web Testing**: Playwright
- **CI/CD**: GitHub Actions (separate jobs for API/Web tests)
- **Language**: JavaScript/Node.js

## CI/CD Features

- **Parallel Test Execution**: API and Web tests run in separate jobs
- **Retry Logic**: API tests retry up to 3 times for reliability
- **Artifact Upload**: Test results and reports saved for download
- **Deployment Gate**: Only deploys when all tests pass
