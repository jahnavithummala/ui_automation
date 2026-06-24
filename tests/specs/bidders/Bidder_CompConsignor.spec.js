import { test, expect } from '@playwright/test'
import { bidderRegistration } from '../../pageobjects/Bidder_Registration'
import { createAccount } from '../../pageobjects/CreateAccount'
import { parse } from "csv-parse/sync"
import fs from 'fs'
import Logger from '../../../Logger'
import chalk from 'chalk'

const productdata = parse(fs.readFileSync('tests/datasource/bidderEnvSetUp/compConsignor.csv'), {
    columns: true,
    skip_empty_lines: true
})

productdata.forEach((bidderEnv) => {
    test(`${bidderEnv.product} in ${bidderEnv.environment}`, async ({ page }) => {
        const logger = new Logger(`Creating CompConsignor Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        logger.logInfo(`Creating CompConsignor Registration for ${bidderEnv.product} in ${bidderEnv.environment}`)
        const bidder_registration = new bidderRegistration(page)
        const create_account = new createAccount(page)

        logger.logStep(`Setting up URL - ${chalk.bold.italic.yellowBright(bidderEnv.url)}`)
        await bidder_registration.setUp_compConsignor_url(bidderEnv.url)
        logger.logStep('Creating an Account')
        const accData = await create_account.createAcc(bidderEnv.environment, bidderEnv.password)
        console.log(`Account created with 
                email: ${chalk.bold.italic.greenBright(accData.email)}, 
                first name: ${chalk.bold.greenBright(accData.firstName)},
                last name: ${chalk.bold.greenBright(accData.lastName)}`
        );
        logger.logStep('Entering the Personal Information Manually')
        await bidder_registration.enter_manually(accData.firstName, accData.lastName)
        logger.logStep(`Adding titled to as - ${chalk.bold.italic.green('Individual')}`)
        //await bidder_registration.registerTo_individual()
        //await bidder_registration.registerTo_business(accData.firstName)
        await bidder_registration.registerTo_dealer(accData.firstName)
        logger.logStep('Entering the address details')
        await bidder_registration.enter_addresses()
        logger.logStep('Desired Bid Limit with selecting Bid Method')
        await bidder_registration.desired_BidLimit()
        //await bidder_registration.select_biddingCollateral_bidMethod()
        //await bidder_registration.select_personalCheck_bidMethod()
        await bidder_registration.select_businessCheck_bidMethod()
        //await bidder_registration.select_wireTransfer_bidMethod()
        //await bidder_registration.select_chooseLater_bidMethod()
        logger.logStep(`Uploading Customer Documents - ${chalk.bold.greenBright('Customer Photo', 'Insurance')}`)
        await bidder_registration.customer_documents()
        //await bidder_registration.business_document()
        await bidder_registration.dealer_documents()
        logger.logStep('Adding Additional Products')
        await bidder_registration.addProducts()
        // logger.logStep('Completing the registration without adding any products')
        // await bidder_registration.without_Products()
        // logger.logStep(`Proceeding with Payment - PaymentMethod: ${chalk.bold.greenBright(bidderEnv.cardType)}`)
        await bidder_registration.proceedWithPayment(bidderEnv.cardNumber, bidderEnv.expiryDate, bidderEnv.cvv)
        logger.logStep('Completing DocuSign process to finalize the registration')
        // await bidder_registration.docuSign()
        await bidder_registration.view_agreement()
        await page.close()
    })
})