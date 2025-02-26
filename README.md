# playwright-demo
## Project Overview

This project is a demonstration of Playwright, a Node.js library to automate Chromium, Firefox, and WebKit with a single API. It showcases various features and capabilities of Playwright for end-to-end testing.

## Features

- Cross-browser testing with Chromium, Firefox, and WebKit
- Headless and headful execution
- Auto-waiting for elements to be ready
- Intercepting network requests
- Capturing screenshots and videos

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Running Tests

To execute the tests, use the following command:

```bash
npx playwright test
```

## Project Structure

- `tests/`: Contains the test files
- `playwright.config.js`: Configuration file for Playwright
- `package.json`: Project dependencies and scripts

## Page Object Model (POM) Architecture

This project follows the Page Object Model (POM) architecture to enhance test maintenance and readability. The POM design pattern helps in creating an object repository for web UI elements, making tests more modular and reusable.

### BasePage

The `BasePage` class serves as a parent class for all page objects. It contains common methods and utilities that can be used across different pages.

```javascript
// basePage.js
class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }
}

module.exports = BasePage;
```

### Page Objects

Each page object inherits from `BasePage` and contains locators and methods specific to that page. The page objects encapsulate the logic and interactions with the web elements.

```javascript
// loginPage.js
const BasePage = require('./basePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#login';
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;
```

### Locators

Locators are defined within the page objects, keeping them separate from the test logic. This separation ensures that any changes to the UI only require updates in the page objects, not the tests.

### Tests

Tests are simplified and modular, focusing on the test scenarios rather than the implementation details. They utilize the page objects to interact with the web application.

```javascript
// login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test('User can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('https://example.com/login');
    await loginPage.login('user', 'password');
    expect(await page.url()).toBe('https://example.com/dashboard');
});
```

By following the POM architecture, the tests become more maintainable, readable, and easier to manage.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License.