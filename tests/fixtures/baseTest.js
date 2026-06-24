import { test, chromium } from '@playwright/test';
import { createAccount } from '../pageobjects/CreateAccount.js'
import { addVIN } from '../pageobjects/Add_VIN.js'
import { vehicleDetails } from '../pageobjects/VehicleDetails.js'
import { titledDocuments } from '../pageobjects/Title_Documents.js'

let browser, context, page;
let create_account, addvin, vehicledetails, titledocuments;

test.beforeAll('setUp', async ({ playwright }) => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()

    create_account = new createAccount(page)
    addvin = new addVIN(page)
    vehicledetails = new vehicleDetails(page)
    titledocuments = new titledDocuments(page)
})

test.afterAll('tearDown', async () => {
    await page.close()
    // await browser.close()
})

export { create_account, addvin, vehicledetails, titledocuments, page, browser, context }