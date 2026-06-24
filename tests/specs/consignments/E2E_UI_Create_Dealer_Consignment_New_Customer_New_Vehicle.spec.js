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
const vehicleData = parse(fs.readFileSync('tests/datasource/consignmentSetUp/vehicleinfo.csv'), {
    columns: true,
    skip_empty_lines: true
})
const scenarioName = scenarioNames.scenario5;

let logger;
let accData;
let envUrl;

vehicleData.forEach((vehicle) => {
    test.describe(`Scenario: ${scenarioName}`, () => {
        test(`${vehicle.year} ${vehicle.make} ${vehicle.model}`, async () => {
            await allure.epic(`Consignment - ${environment}`)
            await allure.feature('Dealer Consignment')
            await allure.story(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)
            await allure.tags(
                'UI_Regression',
                'Smoke',
                'Sanity'
            )
            logger = new Logger(`Executing ${scenarioName}`)
            logger.logInfo('Creating Dealer Consignment')

            await allure.step('Open Consignment URL and Create an Account', async () => {
                logger.logStep('Setting up URL')
                envUrl = await getEnvUrl();
                await create_account.setUp_Url(envUrl)
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

            await allure.step('Add VIN', async () => {
                logger.logStep('Adding VIN information')
                await addvin.enterVIN()
            })

            await allure.step('Enter Vehicle Information', async () => {
                logger.logStep('Entering vehicle information')
                await addvin.vehicleInformation(
                    vehicle.year,
                    vehicle.make,
                    vehicle.model,
                    vehicle.style,
                    vehicle.engine,
                    vehicle.exteriorColor,
                    vehicle.interiorColor
                )
            })

            await allure.step('Enter Vehicle Condition', async () => {
                logger.logStep('Entering vehicle details')
                await vehicledetails.vehicleCondition()
            })

            await allure.step('Enter Vehicle Descriptions', async () => {
                logger.logStep('Entering vehicle descriptions')
                await vehicledetails.vehicleDescriptionsScottsdale(
                    vehicle.year,
                    vehicle.shortDescription,
                    vehicle.longDescription
                )
            })

            const uploadPhotos = false;
            if (uploadPhotos) {
                await allure.step('Upload Vehicle Photos', async () => {
                    logger.logStep('Uploading Vehicle Photos')
                    await vehicledetails.uploadVehiclePhotos()
                })
            }

            await allure.step('Click Next when Vehicle Photos Skipped', async () => {
                logger.logStep('Clicking Next button when vehicle photos are skipped')
                await addvin.clickNext()
            })

            await allure.step('Add TitleTo as Dealer', async () => {
                logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Dealer')}`)
                await titledocuments.addDealerTitledTo(accData.firstName)
            })

            await allure.step('Upload Vehicle Documents', async () => {
                logger.logStep(`Uploading vehicle documents - ${chalk.bold.green('Title Front', 'Title Back')}`)
                await titledocuments.vehicleDocuments()
            })

            await allure.step('Enter Dealer Information', async () => {
                logger.logStep(`Entering dealer information and uploading documents - ${chalk.bold.green('Dealer License', 'Resale License', 'Operating Agreement')}`)
                await titledocuments.dealerInformation()
            })

            await allure.step('Enter Personal Information', async () => {
                logger.logStep('Entering personal information')
                await titledocuments.enterPersonalInfo()
            })

            await allure.step('Finish the Application', async () => {
                logger.logStep(`At the last Step - Finishing application`)
                await titledocuments.finishApplication()
            })

            await allure.step('Review and Submit the Application', async () => {
                logger.logStep(`Reviewing and submitting application with E-Signature - ${chalk.bold.italic.green(accData.firstName)}`)
                await titledocuments.reviewandsubmitApplication(accData.firstName);
            })

            logger.logInfo('Dealer Consignment created successfully')

            await allure.step('View the Submission', async () => {
                await titledocuments.viewSubmission()
                logger.logInfo('Viewed the submission of Dealer Consignment')
            })

        })
    })
})
