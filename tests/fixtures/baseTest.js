import { test as base } from '@playwright/test';
import { createAccount } from '../pageobjects/CreateAccount.js'
import { addVIN } from '../pageobjects/Add_VIN.js'
import { vehicleDetails } from '../pageobjects/VehicleDetails.js'
import { titledDocuments } from '../pageobjects/Title_Documents.js'
import { accountDashboard } from '../pageobjects/AccountDashboard.js'
import { bidderRegistration } from '../pageobjects/Bidder_Registration.js'

export const test = base.extend({

    create_account: async ({ page }, use) => {
        await use(new createAccount(page));
    },

    addvin: async ({ page }, use) => {
        await use(new addVIN(page));
    },

    vehicledetails: async ({ page }, use) => {
        await use(new vehicleDetails(page));
    },

    titledocuments: async ({ page }, use) => {
        await use(new titledDocuments(page));
    },

    accountdashboard: async ({ page }, use) => {
        await use(new accountDashboard(page));
    },

    bidder_registration: async ({ page }, use) => {
        await use(new bidderRegistration(page));
    }
});

export { expect } from '@playwright/test';