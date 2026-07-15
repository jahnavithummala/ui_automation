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
import { getEnvUrl } from '../../../utility.js'
import { allure } from 'allure-playwright'
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "tests/datasource/data/.env") });

const environment = process.env.ENVIRONMENT;
const scenarioName = scenarioNames.scenario10;

let logger;
let accData;
let envUrl;

test.describe(`Scenario: ${scenarioName}`, () => {
    test('Forgot Password and Reset Password', async ({ page, create_account }) => {
        await allure.epic(`Account Forgot and Reset Password`)
        await allure.feature('Forgot_Password_And_Reset_Password_Scenario')
        await allure.tags(
            'UI_Regression',
        )
        logger = new Logger(`Executing ${scenarioName}`)
        logger.logInfo('Starting SignUp')

        await allure.step('Open Consignment URL and Create an Account', async () => {
            logger.logStep('Setting up URL')
            envUrl = await getEnvUrl();
            await create_account.setUp_Url(envUrl)
            logger.logStep('Creating an Account')
            accData = await create_account.createAcc(environment, testData.password)
        })

        const confrimEmail = true
        if (confrimEmail) {
            await allure.step('Confirm Account Creation', async () => {
                logger.logStep('Confirming Account Creation') // through yopmail.com
                await create_account.confirmEmail()
            })
        }

        await allure.step('Forgot Password and Reset Password', async () => {
            logger.logStep('Forgot Password and Reset Password')
            await create_account.forgot_Password()
            await page.waitForTimeout(2000)
            const loggedInSS = await page.screenshot({ fullPage: true });
            await allure.attachment("Logged In", loggedInSS, "image/png");
        })
        logger.logInfo('Forgot Password and Reset Password Scenario Completed Successfully')
    })
})