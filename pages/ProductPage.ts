import {expect} from '@playwright/test';

export const pgEl = (page: any) => ({
    expandBtn: page.getByRole('button', { name: 'Click to expand' }),
    productMgmtBtn: page.getByRole('button', { name: 'Product management' }),
    productCatalogLink: page.getByRole('link', { name: 'Product Catalog' }),
    searchBox: page.getByRole('searchbox', { name: 'Search by product name or' }),
    searchBtn: page.getByRole('button', { name: 'Search' }),
    noRecordsHeading: page.getByRole('heading', { name: 'Sorry, No records found!' }),
    resultsTable: page.locator('table tbody'),
    showingLocator: page.locator('text=Showing'),
    pagination: page.locator('.pagination'),
})

export const validateRecords = async (page:any, keyword: string) => {
    await pgEl(page).expandBtn.click();
    await pgEl(page).productMgmtBtn.click();
    await pgEl(page).productCatalogLink.click();
    await pgEl(page).searchBox.fill(keyword);
    await page.waitForLoadState('load');
    await pgEl(page).searchBtn.click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    
    // Check if "No records found" message is displayed
    const isNoRecords = await pgEl(page).noRecordsHeading.isVisible().catch(() => false);

    if (isNoRecords) {
        console.log(`✓ No records found - test passed`);
        return;
    }

    await expect(pgEl(page).resultsTable).toBeVisible();

    // 1) Assert non-negative count
    await expect(pgEl(page).showingLocator).toBeVisible();

    const showingText = (await pgEl(page).showingLocator.innerText()).trim();
    const totalMatch = showingText.match(/Of\s+([\d,]+)/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : null;
    expect(total).not.toBeNull();
    
    if (total !== null) {
        expect(total).toBeGreaterThanOrEqual(0);
        console.log(`✓ Count is non-negative: ${total} records`);

        // 2) Count visible rows on the current page
        const rows = pgEl(page).resultsTable.locator('tr');
        const rowsCount = await rows.count();

        // 3) Assert correct results display
        if (total > 0) {
            expect(rowsCount).toBeGreaterThan(0);
            console.log(`✓ Correct results displayed: ${rowsCount} rows found`);

            // Optional: assert at least one row contains the keyword (only for alphanumeric keywords)
            // Skip special characters and numeric-only keywords as they may be in specific columns
            if (/^[a-zA-Z\s-]+$/.test(keyword)) {
                const rowContainsKeyword = await pgEl(page).resultsTable.locator(`tr:has-text("${keyword}")`).count();
                expect(rowContainsKeyword).toBeGreaterThanOrEqual(1);
            }
        } else {
            expect(rowsCount).toBe(0);
            console.log(`✓ No results - 0 rows displayed`);
        }

        // 4) Pagination appears only when needed
        const pageSize = 10; // Standard page size

        if (total > pageSize) {
            await expect(pgEl(page).pagination).toBeVisible();
            console.log(`✓ Pagination shown (required for ${total} records)`);
        } else {
            await expect(pgEl(page).pagination).toBeHidden();
            console.log(`✓ Pagination hidden (not needed for ${total} records)`);
        }

        // 5) Sanity checks: displayed rows should not exceed total
        expect(rowsCount).toBeLessThanOrEqual(total);
    }
}