# QA Engineer Assessment - Privilee Website Automation

Automated tests for Privilee website map page and GoRest API endpoints.

## Test Coverage

### API Tests (4 endpoints)
- GET /public/v2/users - User data validation
- GET /public/v2/posts - Post data validation
- GET /public/v2/users/7373665/posts - User-specific posts
- GET /public/v2/todos - Todo data validation

### Web Tests (7 scenarios)
1. Map page loads - URL validation
2. Join button exists and links to signup - Button functionality
3. Map container exists - Map component visibility
4. Venue widgets have text and photos - Widget content validation
5. Filters are clickable - Filter functionality
6. Quick filters match actual filters - Data accuracy
7. Search bar returns results for "Zabeel" - Search functionality

## How to Run Tests

```bash
npm install
npx playwright install  # Install browser for web tests
npm test                # Run all tests
npm run test:api        # API tests only
npm run test:web        # Web tests only
```

## Test Results

- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **API Output**: Console pass/fail status

## Project Structure

```
QA-Auto/
├── collections/collection.json     # Newman API tests
├── tests/privilee-map.spec.js      # Playwright web tests
├── .github/workflows/test.yaml     # CI/CD workflow
├── playwright.config.js            # Browser configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Technologies

- **API Testing**: Newman (Postman CLI)
- **Web Testing**: Playwright
- **CI/CD**: GitHub Actions
