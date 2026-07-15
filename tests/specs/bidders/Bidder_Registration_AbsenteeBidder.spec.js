import { test, expect } from '../../fixtures/baseTest.js'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import Logger from '../../../Logger'
import chalk from 'chalk'
import testData from '../../datasource/testdata.json' with { type: 'json' };
import { bidderScenarios } from '../../../constants.js'
import { allure } from 'allure-playwright'
import dotenv from "dotenv";
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, "tests/datasource/data/.env") });
const environment = process.env.ENVIRONMENT || 'uat';
if (!environment) {
    throw new Error('ENVIRONMENT is not defined. Check .env loading path and process environment variables.');
}
const productdata = parse(fs.readFileSync('tests/datasource/bidderEnvSetUp/absenteeBidder.csv'), {
    columns: true,
    skip_empty_lines: true
})
const filteredProductData = productdata.filter(item => (item.environment || 'uat').toLowerCase() === environment.toLowerCase());
const scenarioName = bidderScenarios.scenario5;

let logger;
let accData;

filteredProductData.forEach((bidderEnv) => {
    test.describe(`Scenario: ${scenarioName} - ${bidderEnv.product}`, () => {
        test(`${bidderEnv.product} in ${environment}`, async ({ page, bidder_registration, create_account }) => {
            await allure.epic('Bidder')
            await allure.story(`Creating Absentee Bidder Registration for ${bidderEnv.product} in ${environment}`)
            await allure.tags(
                'UI_Regression',
                'Smoke',
                'Sanity'
            )
            logger = new Logger(`Executing ${scenarioName}`)
            logger.logInfo('Creating Absentee Bidder Registration')

            await allure.step('Open Absentee Bidder URL', async () => {
                logger.logStep(`Setting up URL - ${chalk.bold.italic.yellowBright(bidderEnv.url)}`)
                await bidder_registration.setUp_absentee_url(bidderEnv.url)
            })

            await allure.step('Creating an Account', async () => {
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

            await allure.step('Starting Absentee Bidder Registration process', async () => {
                logger.logStep('Starting Absentee Bidder Registration process')
                await bidder_registration.pageReload()
                await bidder_registration.internetBidding()
            })

            await allure.step('Entering the Personal Information Manually', async () => {
                logger.logStep('Entering the Personal Information Manually')
                await bidder_registration.enter_manually(accData.firstName, accData.lastName)
            })

            await allure.step('Adding titled to as - Individual', async () => {
                logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
                await bidder_registration.registerTo_individual()
                //logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Business')}`)
                //await bidder_registration.registerTo_business(accData.firstName)
                //logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Dealer')}`)
                //await bidder_registration.registerTo_dealer(accData.firstName)
            })

            await allure.step('Entering the address details', async () => {
                logger.logStep('Entering the address details')
                await bidder_registration.enter_addresses()
            })

            await allure.step('Desired Bid Limit with selecting Bid Method as Credit Card Hold', async () => {
                logger.logStep('Desired Bid Limit with selecting Bid Method as Credit Card Hold')
                await bidder_registration.desired_BidLimit()
                await bidder_registration.select_CreditCardHold_bidMethod()
            })

            await allure.step('Uploading Customer Documents - Customer Photo, Insurance', async () => {
                logger.logStep(`Uploading Customer Documents - ${chalk.bold.greenBright('Customer Photo', 'Insurance')}`)
                await bidder_registration.customer_documents()
            })

            const businessdocument = false
            if (businessdocument) {
                await allure.step('Uploading required business documents', async () => {
                    logger.logStep('Uploading required documents')
                    await bidder_registration.business_document()
                })
            }

            const dealerDocuments = false
            if (dealerDocuments) {
                await allure.step('Uploading required dealer documents', async () => {
                    logger.logStep('Uploading required documents')
                    await bidder_registration.dealer_documents()
                })
            }

            await allure.step(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`, async () => {
                logger.logStep(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`)
                await bidder_registration.proceedWithPayment(bidderEnv.cardNumber, bidderEnv.expiryDate, bidderEnv.cvv)
            })

            await allure.step(`Completing DocuSign process to finalize the registration`, async () => {
                // logger.logStep('Completing DocuSign process to finalize the registration')
                // await bidder_registration.absenteeBidder_docuSign(accData.firstName, accData.lastName)
                await bidder_registration.view_agreement()
                const viewAgreementSS = await page.screenshot({ fullPage: true });
                await allure.attachment("View Agreement", viewAgreementSS, "image/png");
                await page.close()
            })
        })
    })
})