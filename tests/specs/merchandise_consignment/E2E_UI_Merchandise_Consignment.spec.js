import { test, expect } from '@playwright/test'
import { MerchandiseConsignment } from '../../pageobjects/Merchandise.js'
import { createAccount } from '../../pageobjects/CreateAccount.js'
import { allure } from 'allure-playwright'

test.describe('Creating New Individual Consignment with Merchandise Items', () => {
    let create_account;
    let Merchandise_Consignment;

    test('New Individual Customer with Merchandise Items', async ({ page }) => {
        Merchandise_Consignment = new MerchandiseConsignment(page);
        create_account = new createAccount(page);
        await Merchandise_Consignment.setUp_Merchandise_Consignment()
        const accData = await create_account.createAcc();
        allure.feature('SignUp to our Application');
        await test.step('Providing user credentials to SignUp...', async () => {
            const Signup_Screenshot = await page.screenshot({ fullPage: true });
            allure.attachment('Signup Screenshot', Signup_Screenshot, 'image/png');
        });

        allure.feature('Add Merchandise Items');
        await test.step('Adding Merchandise Items...', async () => {
            await Merchandise_Consignment.AddMerchandise();
            const Merchandise_Screenshot = await page.screenshot({ fullPage: true });
            allure.attachment('Merchandise Screenshot', Merchandise_Screenshot, 'image/png');
        });

        allure.feature('Merchandise Contact Info');
        await test.step('Adding Merchandise Contact Info...', async () => {
            await Merchandise_Consignment.MerchandiseContactInfo(accData.firstName);
            const ContactInfo_Screenshot = await page.screenshot({ fullPage: true });
            allure.attachment('Contact Info Screenshot', ContactInfo_Screenshot, 'image/png');
        });
    });
});