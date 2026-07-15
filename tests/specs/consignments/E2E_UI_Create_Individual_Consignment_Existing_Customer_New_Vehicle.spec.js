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
const vehicleData = parse(fs.readFileSync('tests/datasource/consignmentSetUp/vehicleinfo.csv'), {
    columns: true,
    skip_empty_lines: true
})
const envSetupData = parse(fs.readFileSync('tests/datasource/consignmentSetUp/envsetup.csv'), {
    columns: true,
    skip_empty_lines: true
})
const existingCustomer = envSetupData.find(env => env.environment === environment).existingCustomer;
const password = envSetupData.find(env => env.environment === environment).password;
const scenarioName = scenarioNames.scenario2;

let logger;
let accData;
let envUrl;
let personalInfo;

vehicleData.forEach((vehicle) => {
    test.describe(`Scenario: ${scenarioName}`, () => {
        test(`${vehicle.year} ${vehicle.make} ${vehicle.model}`, async ({ page, create_account, addvin, vehicledetails, titledocuments }) => {
            await allure.epic(`Consignment - ${environment}`)
            await allure.feature('Individual Consignment_Existing Customer')
            await allure.story(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)
            await allure.tags(
                'UI_Regression',
                'Smoke',
                'Sanity'
            )
            logger = new Logger(`Executing ${scenarioName}`)
            logger.logInfo('Creating Individual Consignment')

            await allure.step('Open Consignment URL and Create an Account', async () => {
                logger.logStep('Setting up URL')
                envUrl = await getEnvUrl();
                await create_account.setUp_Url(envUrl)
                logger.logStep('Logging in with existing user')
                await create_account.login_existingUser(existingCustomer, password)
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
                await addvin.enterVIN(10)
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
            else {
                await allure.step('Click Next when Vehicle Photos Skipped', async () => {
                    logger.logStep('Clicking Next button when vehicle photos are skipped')
                    await addvin.clickNext()
                })
            }

            await allure.step('Add TitleTo as Individual', async () => {
                logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
                await titledocuments.addIndiTitledTo()
            })

            await allure.step('Upload Vehicle Documents', async () => {
                logger.logStep(`Uploading vehicle documents - ${chalk.bold.green('Title Front', 'Title Back')}`)
                await titledocuments.vehicleDocuments()
            })

            await allure.step('Retrieve Personal Information', async () => {
                logger.logStep('Retrieving personal information')
                personalInfo = await titledocuments.getPersonalInfo()
                console.log(`Account Details used for Consignment:  
                first name: ${chalk.bold.greenBright(personalInfo.getfirstName)}, 
                last name: ${chalk.bold.greenBright(personalInfo.getlastName)},
                email: ${chalk.bold.italic.greenBright(personalInfo.getemail)},
                contact number: ${chalk.bold.greenBright(personalInfo.getcontactNumber)}`
                );
            })

            await allure.step('Finish the Application', async () => {
                logger.logStep(`At the last Step - Finishing application`)
                await titledocuments.finishApplication()
            })

            await allure.step('Review and Submit the Application', async () => {
                logger.logStep(`Reviewing and submitting application with E-Signature - ${chalk.bold.italic.green(personalInfo.getfirstName)}`)
                await titledocuments.reviewandsubmitApplication(personalInfo.getfirstName);
            })

            logger.logInfo('Individual Consignment created successfully')

            await allure.step('View the Submission', async () => {
                await titledocuments.viewSubmission()
                await page.waitForTimeout(2000)
                const viewSubmissionSS = await page.screenshot({ fullPage: true });
                await allure.attachment("View Submission", viewSubmissionSS, "image/png");
                logger.logInfo('Viewed the submission of Individual Consignment')
            })
        })
    })
})
