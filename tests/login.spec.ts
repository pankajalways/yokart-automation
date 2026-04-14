import {test} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { signIn, validateAdminName, validateWrongPassword , validateEmptyField} from '../pages/LoginPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

test.describe('Login Tests', () => {
    test('Validate Successful Login', async({page}) => {
        await signIn(page);
        await validateAdminName(page);
    });

    test('Validate Worng password', async ({page}) => {
        await validateWrongPassword(page);
    });

    test('Validate Empty fields',async ({page}) => {
        await validateEmptyField(page);
    })
})