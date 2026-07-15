import { test, expect } from '../../fixtures/baseTest.js'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import Logger from '../../../Logger'
import chalk from 'chalk'
import dotenv from "dotenv"
import path from 'path'
import { bidderScenarios } from '../../../constants.js'
import { allure } from 'allure-playwright'
import testData from '../../datasource/testdata.json' with { type: 'json' }

dotenv.config({ path: path.resolve(__dirname, '../../datasource/data/.env') });
const environment = process.env.ENVIRONMENT || 'uat';
if (!environment) {
    throw new Error('ENVIRONMENT is not defined. Check .env loading path and process environment variables.');
}
const productdata = parse(fs.readFileSync('tests/datasource/bidderEnvSetUp/product.csv'), {
    columns: true,
    skip_empty_lines: true
})
const filteredProductData = productdata.filter(item => (item.environment || 'uat').toLowerCase() === environment.toLowerCase());
const scenarioName = bidderScenarios.scenario1;

let logger;
let accData;

filteredProductData.forEach((bidderEnv) => {
    test.describe(`Scenario: ${scenarioName} - ${bidderEnv.product}`, () => {
        test(`Individual Bidder Registration ${bidderEnv.product} - ${environment}`, async ({ page, bidder_registration, create_account }) => {
            await allure.epic('Bidder')
            await allure.story(`${bidderEnv.product}`)
            await allure.tags(
                'UI_Regression',
                'Smoke',
                'Sanity'
            )
            logger = new Logger(`Executing ${scenarioName}`)
            logger.logInfo('Creating Individual Bidder Registration')

            await allure.step('Open Bidder URL and Create an Account', async () => {
                logger.logStep(`Setting up URL - ${chalk.bold.italic.yellowBright(bidderEnv.url)}`)
                await bidder_registration.setUp_url(bidderEnv.url)
                logger.logStep('Creating an Account')
                accData = await create_account.createAcc(environment, testData.password)
                console.log(`Account created with 
                    email: ${chalk.bold.italic.greenBright(accData.email)}, 
                    first name: ${chalk.bold.greenBright(accData.firstName)}, 
                    last name: ${chalk.bold.greenBright(accData.lastName)}`
                );
            })

            const confrimEmail = false
            if (confrimEmail) {
                await allure.step('Confirm Account Creation', async () => {
                    logger.logStep('Confirming Account creation')
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

            await allure.step('Start Bidder Registration process with Uploading the Drivers License', async () => {
                logger.logStep('Starting Bidder Registration process with Uploading the Drivers License')
                await bidder_registration.start_registration_upload_DriversLicense(accData.firstName, accData.lastName)
                //await bidder_registration.enter_manually(accData.firstName, accData.lastName)
            })

            await allure.step('Adding titled to as - Individual', async () => {
                logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
                await bidder_registration.registerTo_individual()
            })

            await allure.step('Entering the address details', async () => {
                logger.logStep('Entering the address details')
                await bidder_registration.enter_addresses()
            })

            await allure.step('Desired Bid Limit with selecting Bid Method', async () => {
                await bidder_registration.desired_BidLimit()
                await bidder_registration.select_biddingCollateral_bidMethod()
                // await bidder_registration.select_personalCheck_bidMethod()
                // await bidder_registration.select_wireTransfer_bidMethod()
                // await bidder_registration.select_businessCheck_bidMethod()
                // await bidder_registration.select_chooseLater_bidMethod()
            })

            await allure.step(`Uploading Customer Documents - ${chalk.bold.greenBright('Customer Photo', 'Insurance')}`, async () => {
                await bidder_registration.customer_documents()
            })

            await allure.step('Adding Additional Products', async () => {
                await bidder_registration.addProducts()
            })

            await allure.step(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`, async () => {
                await bidder_registration.proceedWithPayment(bidderEnv.cardNumber, bidderEnv.expiryDate, bidderEnv.cvv)
            })

            await allure.step('Completing DocuSign process to finalize the registration', async () => {
                // logger.logStep('Completing DocuSign process to finalize the registration')
                // await bidder_registration.docuSign()
                await bidder_registration.view_agreement()
                const viewAgreementSS = await page.screenshot({ fullPage: true });
                await allure.attachment("View Agreement", viewAgreementSS, "image/png");
                await page.close()
            })
        })
    })
})