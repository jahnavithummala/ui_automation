import {
    test, expect
} from '../../fixtures/baseTest.js'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import path from 'path'
import Logger from '../../../Logger.js'
import chalk from 'chalk'
import testData from '../../datasource/testdata.json' with { type: 'json' };
import { scenarioNames } from '../../../constants.js'
import { getEnvUrl, captureScreenshot } from '../../../utility.js'
import { allure } from 'allure-playwright'
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "tests/datasource/data/.env") });

const environment = process.env.ENVIRONMENT;
const scenarioName = scenarioNames.scenario11;

let logger;
let accData;
let envUrl;

test.describe(`Scenario: ${scenarioName}`, () => {
    test('Invalid VIN Entry', async ({ page, create_account, addvin }) => {
        await allure.epic(`Consignment - ${environment}`)
        await allure.feature('Invalid VIN Entry')
        await allure.tags(
            'UI_Regression',
            'Negative_TestCase'
        )
        logger = new Logger(`Executing ${scenarioName}`)
        logger.logInfo('Starting SignUp')

        await allure.step('Open Consignment URL and Create an Account', async () => {
            logger.logStep('Setting up URL')
            envUrl = await getEnvUrl();
            await create_account.setUp_Url(envUrl)
            logger.logStep('Creating an Account')
            accData = await create_account.createAcc(environment, testData.password)
            //await captureScreenshot(this.page, "Create Account")
        })

        const confrimEmail = false
        if (confrimEmail) {
            await allure.step('Confirm Account Creation', async () => {
                logger.logStep('Confirming Account Creation') // through yopmail.com
                await create_account.confirmEmail()
                //await captureScreenshot(this.page, "Confirmed Email")
            })
        }

        const loginAfterConfirmation = false
        if (loginAfterConfirmation) {
            await allure.step('Login with the created account - After Confirmation', async () => {
                logger.logStep('Logging in with the created account - After Confirmation')
                await create_account.loginIn()
                //await captureScreenshot(this.page, "LoggedIn")
            })
        }

        await allure.step('Add VIN', async () => {
            logger.logStep('Adding VIN information')
            await addvin.enterVIN(22)
            await page.waitForTimeout(2000)
            const vinErrorSS = await page.screenshot({ fullPage: true })
            await allure.attachment('Invalid VIN Error Message', vinErrorSS, 'image/png')
        })
        logger.logInfo('Invalid VIN is entered and error message is displayed')
    })
})