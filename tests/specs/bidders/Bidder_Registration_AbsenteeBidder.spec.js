import { test, expect } from '@playwright/test'
import { bidderRegistration } from '../../pageobjects/Bidder_Registration'
import { createAccount } from '../../pageobjects/CreateAccount'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import Logger from '../../../Logger'
import chalk from 'chalk'
import { env } from 'process'

const productdata = parse(fs.readFileSync('tests/datasource/bidderEnvSetUp/absenteeBidder.csv'), {
    columns: true,
    skip_empty_lines: true
})

productdata.forEach((bidderEnv) => {
    test(`${bidderEnv.product} in ${bidderEnv.environment}`, async ({ page }) => {
        const logger = new Logger(`Creating Absentee Bidder Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        logger.logInfo(`Creating Absentee Bidder Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        const create_account = new createAccount(page)
        const bidder_registration = new bidderRegistration(page)

        logger.logStep(`Setting up URL - ${chalk.bold.italic.yellowBright(bidderEnv.url)}`)
        await bidder_registration.setUp_absentee_url(bidderEnv.url)
        logger.logStep('Creating an Account')
        const accData = await create_account.createAcc(bidderEnv.environment, bidderEnv.password)
        console.log(`Account created with 
                email: ${chalk.bold.italic.greenBright(accData.email)}, 
                first name: ${chalk.bold.greenBright(accData.firstName)}, 
                last name: ${chalk.bold.greenBright(accData.lastName)}`
        );
        logger.logStep('Starting Absentee Bidder Registration process')
        await bidder_registration.internetBidding()
        logger.logStep('Entering the Personal Information Manually')
        await bidder_registration.enter_manually(accData.firstName, accData.lastName)
        logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
        await bidder_registration.registerTo_individual()
        //logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Business')}`)
        //await bidder_registration.registerTo_business(accData.firstName)
        //logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Dealer')}`)
        //await bidder_registration.registerTo_dealer(accData.firstName)
        logger.logStep('Entering the address details')
        await bidder_registration.enter_addresses()
        logger.logStep('Desired Bid Limit with selecting Bid Method as Credit Card Hold')
        await bidder_registration.desired_BidLimit()
        await bidder_registration.select_CreditCardHold_bidMethod()
        logger.logStep(`Uploading Customer Documents - ${chalk.bold.greenBright('Customer Photo', 'Insurance')}`)
        await bidder_registration.customer_documents()
        //logger.logStep(`Uploading Business Document - ${chalk.bold.greenBright('Business License')}`)
        //await bidder_registration.business_document()
        //logger.logStep(`Uploading Dealer Specific Documents - ${chalk.bold.greenBright('Dealer License', 'Resale Certificate', 'Verification of Ownership', 'Authorization to Bid')}`)
        //await bidder_registration.dealer_documents()
        logger.logStep(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`)
        await bidder_registration.proceedWithPayment(bidderEnv.cardNumber, bidderEnv.expiryDate, bidderEnv.cvv)
        // logger.logStep('Completing DocuSign process to finalize the registration')
        // await bidder_registration.absenteeBidder_docuSign(accData.firstName, accData.lastName)
        await bidder_registration.view_agreement()
        await page.close()
    })
})