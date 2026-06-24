import { test } from '@playwright/test'
import {
    create_account,
    addvin,
    vehicledetails,
    titledocuments,
    page,
    browser,
    context
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
const scenarioName = scenarioNames.scenario9;

let logger;
let accData;
let envUrl;

test.describe(`Scenario: ${scenarioName}`, () => {
    test('@regression', async () => {
        await allure.epic(`Consignment - ${environment}`)
        await allure.feature('SignUp_Logout_Login_Scenario')
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

        const confrimEmail = false
        if (confrimEmail) {
            await allure.step('Confirm Account Creation', async () => {
                logger.logStep('Confirming Account Creation') // through yopmail.com
                await create_account.confirmEmail()
            })
        }

        const loginAfterConfirmation = false
        if (loginAfterConfirmation) {
            await allure.step('Login with the created account - After Confirmation', async () => {
                logger.logStep('Logging in with the created account - After Confirmation')
                await create_account.loginIn()
            })
        }

        await allure.step('Logout from the account', async () => {
            logger.logStep('Logging out from the account')
            await create_account.logOut_Account()
        })

        await allure.step('Login with the created account - After Logout', async () => {
            logger.logStep('Logging in with the created account - After Logout')
            await create_account.login_existingUser(accData.email, testData.password)
        })
        logger.logInfo('SignUp_Logout_Login_Scenario completed successfully')
    })
})