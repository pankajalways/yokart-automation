import {expect} from '@playwright/test';

export const pgEl = (page: any) => ({
    usernameField: page.getByRole('textbox', { name: 'Username' }),
    passwordField: page.getByRole('textbox', { name: 'Password' }),
    signInBtn: page.getByRole('button', { name: 'Sign In' }),
    adminLink: page.getByRole('link', { name: 'Admin' }),
    adminHeading: page.getByRole('heading', { name: 'Hi, FATbit Technologies' }),
    errorMessage: page.getByText('Invalid username or password'),
    passwordMandatoryError: page.getByRole('link', { name: 'Password Is Mandatory' }),
})

export const signIn = async (page : any) => {
    await page.goto('');
    await pgEl(page).usernameField.fill(process.env.USERNAME || '');
    await pgEl(page).passwordField.fill(process.env.PASSWORD || '');
    await pgEl(page).signInBtn.click();
}

export const validateAdminName = async (page:any) => {
    await pgEl(page).adminLink.click();
    await expect(pgEl(page).adminHeading).toBeVisible();
}

export const validateWrongPassword = async (page: any) => {
    await page.goto('');
    await pgEl(page).usernameField.fill(process.env.USERNAME || '');
    await pgEl(page).passwordField.fill('pankaj');
    await pgEl(page).signInBtn.click();
    await expect(pgEl(page).errorMessage).toBeVisible();
}

export const validateEmptyField = async (page:any) => {
    await page.goto('');
    await pgEl(page).usernameField.fill(process.env.USERNAME || '');
    await pgEl(page).passwordField.fill('');
    await pgEl(page).signInBtn.click();
    await expect(pgEl(page).passwordMandatoryError).toBeVisible();
}