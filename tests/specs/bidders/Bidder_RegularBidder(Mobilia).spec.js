import { test, expect } from '@playwright/test'
import { bidderRegistration } from '../../pageobjects/Bidder_Registration'
import { createAccount } from '../../pageobjects/CreateAccount'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import Logger from '../../../Logger'
import chalk from 'chalk'

const productdata = parse(fs.readFileSync('tests/datasource/bidderEnvSetUp/regularBidder(Mobilia).csv'), {
    columns: true,
    skip_empty_lines: true
})

productdata.forEach((bidderEnv) => {
    test(`${bidderEnv.product} in ${bidderEnv.environment}`, async ({ page }) => {
        const logger = new Logger(`Creating Regular Bidder(Mobilia) Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        logger.logInfo(`Creating Regular Bidder(Mobilia) Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        const bidder_registration = new bidderRegistration(page)
        const create_account = new createAccount(page)

        logger.logStep(`Setting up URL - ${chalk.bold.italic.yellowBright(bidderEnv.url)}`)
        await bidder_registration.setUp_regularBidderMobilia_url(bidderEnv.url)
        logger.logStep('Creating an Account')
        const accData = await create_account.createAcc(bidderEnv.environment, bidderEnv.password)
        console.log(`Account created with 
                email: ${chalk.bold.italic.greenBright(accData.email)}, 
                first name: ${chalk.bold.greenBright(accData.firstName)}, 
                last name: ${chalk.bold.greenBright(accData.lastName)}`
        );
        logger.logStep('Starting Bidder Registration process with Uploading the Drivers License')
        await bidder_registration.start_registration_upload_DriversLicense(accData.firstName, accData.lastName)
        logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
        await bidder_registration.registerTo_individual()
        //await bidder_registration.registerTo_business(accData.firstName)
        //await bidder_registration.registerTo_dealer(accData.firstName)
        logger.logStep('Entering the address details')
        await bidder_registration.regularBidder_Address()
        logger.logStep('Desired Bid Limit with selecting Bid Method')
        await bidder_registration.desired_BidLimit()
        await bidder_registration.select_biddingCollateral_bidMethod()
        //await bidder_registration.select_personalCheck_bidMethod()
        //await bidder_registration.select_businessCheck_bidMethod()
        //await bidder_registration.select_wireTransfer_bidMethod()
        //await bidder_registration.select_chooseLater_bidMethod()
        //await bidder_registration.business_document()
        //await bidder_registration.dealer_documents()
        logger.logStep(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`)
        await bidder_registration.proceedWithPayment(bidderEnv.cardNumber, bidderEnv.expiryDate, bidderEnv.cvv)
        // logger.logStep('Completing DocuSign process to finalize the registration')
        // await bidder_registration.docuSign()
        await bidder_registration.view_agreement()
        await page.close()
    })
})