import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchData } from '../utils/testData';
import {signIn} from '../pages/LoginPage';
import {validateRecords} from '../pages/ProductPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

// Calculate number of test data items
const numberOfTests = searchData.length;

// Create a test for each keyword
for (let i = 0; i < numberOfTests; i++) {
    const keyword = searchData[i].keyword;
    
    test(`Product Search - Keyword: "${keyword}"`, async({page}) => {
        await signIn(page);
        await validateRecords(page,keyword);
    });
}
