# Admin Panel Testing Framework

This is a testing framework for the Admin Panel. It use Playwright to test different things in the admin panel.

## What is this?

This framework is made for testing the admin panel. It test login and product search function. When you run test it will automatically open browser and do the test for you.

## First Time Setup (After Cloning)

When you clone this repository from GitHub, you **MUST** do these steps in order:

### Step 1: Install Node Modules

The `node_modules` folder is not in the repo, so you need to create it by running:

```
npm install
```

This command will download and install all the packages that this project need (like Playwright and others). **Do not skip this step!** If you do, the tests will not work.

### Step 2: Install Playwright Browsers

After installing node modules, you need to download the browsers that Playwright need. Run this command:

```
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers. The tests need these browsers to work. This command take some time because browsers are big files (around 300-400MB).

## Environment Setup

After installing everything, you need to create a `.env` file in the root folder with this information:

```
USERNAME=your_username
PASSWORD=your_password
```

Without this file the login will not work.

## How to Run Tests

To run all tests use this command:

```
npm test
```

Or if you use Playtwright directly:

```
npx playwright test
```

## How to Run Specific Test

If you want to run only login test:

```
npx playwright test login.spec.ts
```

If you want to run only product filter test:

```
npx playwright test productFilter.spec.ts
```

## File Structure

This is how the files are organized:

```
├── pages/
│   ├── LoginPage.ts      - All login page locators and functions
│   └── ProductPage.ts    - All product page locators and functions
├── tests/
│   ├── login.spec.ts     - Login test cases
│   └── productFilter.spec.ts - Product search test cases
├── utils/
│   └── testData.ts       - Test data (keywords to search)
├── playwright.config.ts  - Configuration for Playwright
├── package.json          - Project dependencies
└── .env                  - Your login credentials (create this)
```

## What Tests Do

### Login Tests
- Test login with correct username and password
- Test login with wrong password
- Test login with empty password field
- Test that admin name is displayed after login

### Product Filter Tests
- Test product search with keyword "phone"
- Test product search with keyword "laptop"
- Test product search with keyword "12345"
- Test product search with special characters "!@#$%"
- Check that results are showing correctly
- Check pagination appear when there are many results

## Pages Structure

### LoginPage.ts
This file have all login page things:
- `pgEl()` - This have all the locators (buttons, fields, etc)
- `signIn()` - Function to login into system
- `validateAdminName()` - Check if admin name is showing
- `validateWrongPassword()` - Check wrong password error
- `validateEmptyField()` - Check empty field error

### ProductPage.ts
This file have all product page things:
- `pgEl()` - This have all the locators for product page
- `validateRecords()` - This function check if search results are correct

## How to Add New Tests

1. Create new file in `tests/` folder with name like `myTest.spec.ts`
2. Import things you need from `pages/`
3. Write your test cases

Example:
```typescript
import {test} from '@playwright/test';
import {signIn} from '../pages/LoginPage';

test('My Test', async({page}) => {
    await signIn(page);
    // Do more things here
});
```

## Test Data

All the keywords for searching are in `utils/testData.ts`. If you want to add more keywords just add in array:

```typescript
export const searchData = [
  { keyword: 'phone' },
  { keyword: 'laptop' },
  // Add your keyword here
];
```

## Reports

After running tests, Playwright create report folder with details about what happen. You can see report in `playwright-report/index.html` file.

## Troubleshooting

### Tests not running
- Check if nodejs is installed
- Check if packages are installed (run `npm install`)
- Check if `.env` file have correct username and password

### Tests failing
- Check if the website is working
- Check if locators are correct (maybe website change)
- Check browser window - maybe element is not visible

## Tips for Writing Good Tests

1. Always wait for page to load before doing action - use `page.waitForLoadState('load')`
2. Always check if something is visible before clicking - use `toBeVisible()`
3. Use locators from `pgEl()` object - dont write locators in test
4. Write clear test names - tell what test is checking
5. Add console log to see what happening - use `console.log()`

## Need Help?

If something not working:
1. Read the error message - it tell what is wrong
2. Check the website - maybe you need to change locators
3. Check `.env` file - maybe credentials are wrong

That is all! Now you can test admin panel! Good luck!
