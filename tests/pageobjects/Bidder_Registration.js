import testdata from '../../tests/datasource/testdata.json' with { type: 'json' };
import * as allure from "allure-js-commons";

export class bidderRegistration {
    constructor(page) {
        this.page = page
        //this.browserData = new browserData()
        // Start registration now!
        // Let's begin by entering your driver's license information.
        // Upload a clear photo of your government-issued driver's license.
        this.internet_OnlineBidding = "//label//div" // only for absentee bidder
        this.upload_driversLicense = "(//input[@type='file'])[1]"
        this.upload_passport = "(//input[@type='file'])[2]"
        this.enter_manually_button = "(//button[@type='button' and text()='Enter manually'])[3]"
        this.first_name = "//input[@name='firstName']"  //random generate
        this.last_name = "//input[@name='lastName']" //random generate
        this.identity_method = "//span[text()='Identity method']/parent::div/following-sibling::button"
        this.select_driverslicence = "//div[@role='listbox']/div[1]"
        this.select_passport = "//div[@role='listbox']/div[2]"
        this.drivers_license = "//input[@name='driversLicense']"
        this.passport_number = "//input[@name='passportNumber']"
        this.state = "//span[text()='State']/parent::div/following-sibling::button"
        this.searchState = "//input[@aria-label='Search']"
        this.selectState = "//div[@role='listbox']/div[1]"
        this.expiration_date_calender = "(//button[@aria-label='Calendar'])[1]"
        this.expiration_date_calender_next = "(//button[@aria-label='Next'])[1]"
        this.select_expiration_date = "//table//tr[3]/td[5]"
        //this.date_of_birth = "//input[@name='dateOfBirth']"   //testData
        this.expirationDate_mm = "//span[text()='Expiration Date']/parent::div/following-sibling::div//span[1]"
        this.expirationDate_dd = "//span[text()='Expiration Date']/parent::div/following-sibling::div//span[3]"
        this.expirationDate_yyyy = "//span[text()='Expiration Date']/parent::div/following-sibling::div//span[5]"
        this.mm = "//span[.='mm']"
        this.dd = "//span[.='dd']"
        this.yyyy = "//span[.='yyyy']"
        this.mobile_number = "//input[@name='mobileNumber']"
        this.next_button = "//button[@type='submit']"

        // Complete your information
        // Enter the information as you want it to appear on your purchase documents.
        this.select_individual = "//div[@role='radiogroup']//div/label[1]"

        this.select_business = "//div[@role='radiogroup']//div/label[2]"
        this.business_name = "//input[@name='businessName']"
        this.business_phone_number = "//input[@name='businessPhoneNumber']"
        this.business_ein_number = "//input[@name='ein']"
        this.relationship_to_business = "//span[text()='Relationship to business']/parent::div/following-sibling::button"
        this.choose_owner = "//div[@role='listbox']/div[1]"
        this.choose_representative = "//div[@role='listbox']/div[2]"

        this.select_dealer = "//div[@role='radiogroup']//div/label[3]"
        this.dealer_name = "//input[@name='businessName']"
        this.dealer_license_number = "//input[@name='dealerLicenseNumber']"
        this.dealer_phone_number = "//input[@name='businessPhoneNumber']"
        this.resale_taxid = "//input[@name='taxId']"
        this.dealer_state = "//span[text()='State']/parent::div/following-sibling::button"
        this.search_dealer_state = "//input[@aria-label='Search']"
        this.select_dealer_state = "//div[@role='listbox']/div[1]"
        this.relationship_to_dealer = "//span[text()='Relationship to dealer']/parent::div/following-sibling::button"

        // Enter your Addresses
        // Enter the information as you want it to appear on your purchase documents.
        this.search_address = "(//input[@name='addressSearch'])[1]"
        // this.vehicleTitling_address = "(//input[@name='addressSearch'])[2]"
        // this.titlePaperwork_address = "(//input[@name='addressSearch'])[3]"
        // this.bidding_address = "(//input[@name='addressSearch'])[4]"
        this.select_address = "//div[@role='listbox']/div[1]"

        // How will you pay for your vehicle?
        // Indicate below which method of payment you plan to use for your vehicle purchase.
        this.desired_bid_limit = "//input[@inputmode='numeric']"
        this.biddingCollateral_bidMethod = "//p[text()='Bidding collateral']"
        this.financing_bidMethod = "//p[text()='Financing']"
        this.personalCheck_bidMethod = "//p[text()='Personal check']"
        this.businessCheck_bidMethod = "//p[text()='Business check']"
        this.wireTransfer_bidMethod = "//p[text()='Wire transfer']"
        this.CreditCardHold_bidMethod = "//p[text()='Credit Card Hold']"
        this.check_bankletter = "//input[@type='file']"
        this.chooseLater_bidMethod = "//p[contains(text(),'choose later')]"

        // Add additional documents
        // We need your documents to support your registration.
        this.customer_photo = "(//input[@type='file'])[1]"
        this.cropImage = "//button[@type='button']//span[text()='Crop']"
        this.insurance = "(//input[@type='file'])[1]"
        this.insurance_calendar = "//button[@aria-label='Calendar']"
        this.insurance_calendar_next = "(//button[@aria-label='Next'])[1]"
        this.select_insurance_date = "//table//tr[3]/td[5]"
        this.upload_business_licence_document = "//input[@type='file']"
        this.upload_dealer_licence_document = "(//input[@type='file'])[1]"
        this.dealer_calendar = "(//button[@aria-label='Calendar'])[1]"
        this.dealer_calendar_next = "(//button[@aria-label='Next'])[1]"
        this.dealer_licence_select_date = "//table//tr[3]/td[5]"
        this.upload_resale_licence_document = "(//input[@type='file'])[1]"
        this.resale_calendar = "(//button[@aria-label='Calendar'])[2]"
        this.resale_calendar_next = "(//button[@aria-label='Next'])[1]"
        this.resale_licence_select_date = "//table//tr[3]/td[5]"
        this.upload_verification_of_ownership_document = "(//input[@type='file'])[1]"
        this.upload_authorization_to_bid = "(//input[@type='file'])[1]"

        // Enhance your auction experience
        // If you have more than one guest, please select from the options below
        this.tr1product = "//tr[1]//td[3]//button[@aria-label='Increase Quantity']"
        this.tr2product = "//tr[2]//td[3]//button[@aria-label='Increase Quantity']"
        this.tr3product = "//tr[3]//td[3]//button[@aria-label='Increase Quantity']"
        this.tr4product = "//tr[4]//td[3]//button[@aria-label='Increase Quantity']" // when we select the select package then tr4 will be the muscle lounge(Event)
        this.tr5product = "//tr[5]//td[3]//button[@aria-label='Increase Quantity']"

        // Let's proceed with payment
        // Complete your payment and finalize your initial registration.
        this.confirmRegistration = "//span[text()='Confirm registration']"
        this.firstname_on_card = "//input[@name='firstNameCard']"
        this.lastname_on_card = "//input[@name='lastNameCard']"
        this.selectExistingAddress = "//button[text()='Select an existing address']"
        this.selectMailingAddress = "//p[text()='Mailing Address']"
        this.confirmselection = "//button/span[text()='Confirm Selection']"
        this.card_number = "//input[@id='cardNumber']"
        this.expiration_date_mmyy = "//input[@id='expirationDate']"
        this.card_cvv = "//input[@id='cvv']"
        this.postalcode = "//input[@id='postalCode']"
        this.addressPostalCode = "//input[@name='addresses.0.zip']"
        this.click_pay_for_registration = "//button[@type='submit']/span[text()='Pay for registration']"

        // Review & sign your bidder agreement
        // This will take place with an e-signature via DocuSign
        this.libraryFrame = "//iframe[contains(@id,'js-library-iframe')]"
        this.docuSignFrame = "//iframe[@title='Docusign Document']"
        this.agree_signature = "//span[text()='I agree to use electronic records and signatures.']"
        this.continue_button = "//button[@type='button']/span[text()='Continue']"
        this.click_sign = "(//div[text()='Sign'])[1]"
        this.adopt_and_sign = "(//button[@value='signature'])[1]"
        this.initial1 = "(//div[text()='Initial'])[1]"
        this.initial2 = "(//div[text()='Initial'])[2]"
        this.printName = "//input[@aria-invalid='true']"
        this.signatureRequired = "(//div[text()='Sign'])[2]"
        this.submit_application = "//button[@type='button']/span[text()='Submit application']"
        //this.Absentee_Next = "//button[@type='button']/span[text()='Next']"
        this.view_my_agreement = "//span[text()='View my agreement']"
    }

    // SetUp Url for Premium and Select Package
    async setUp_url(url) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(url)
    }

    async pageReload() {
        await this.page.reload();
    }

    async setUp_absentee_url(url) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(url)
        await this.page.reload();
        // await this.page.waitForTimeout(4000);
        // await this.page.reload();
    }

    async setUp_regularBidderMobilia_url(url) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(url)
    }

    async setUp_compConsignor_url(url) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(url)
    }

    async internetBidding() {
        await this.page.locator(this.internet_OnlineBidding).check()
        await this.page.waitForTimeout(2000)
        const internetBiddingSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Internet Bidding", internetBiddingSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async start_registration_upload_DriversLicense(firstName, lastName) {
        const driverslicencePhoto = testdata.driversLicensePath
        await this.page.locator(this.upload_driversLicense).setInputFiles(driverslicencePhoto)
        await this.page.waitForTimeout(6000)
        await this.page.locator(this.first_name).clear()
        await this.page.locator(this.first_name).fill(`${firstName}`)
        await this.page.locator(this.last_name).clear()
        await this.page.locator(this.last_name).fill(`${lastName}`)
        await this.page.locator(this.expirationDate_mm).clear()
        await this.page.locator(this.expirationDate_mm).fill(testdata.mm)
        await this.page.locator(this.expirationDate_dd).clear()
        await this.page.locator(this.expirationDate_dd).fill(testdata.dd)
        await this.page.locator(this.expirationDate_yyyy).clear()
        await this.page.locator(this.expirationDate_yyyy).fill(testdata.expirationDate_yyyy)
        const accountPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const accountPhoneNumber = "5677" + accountPhnNumber
        console.log("Generated Account Phone Number:", accountPhoneNumber)
        await this.page.locator(this.mobile_number).click()
        await this.page.locator(this.mobile_number).fill(accountPhoneNumber)
        await this.page.waitForTimeout(2000)
        const driversLicenseSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Drivers License Uploaded", driversLicenseSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async enter_manually(firstName, lastName) {
        await this.page.locator(this.enter_manually_button).click()
        await this.page.locator(this.first_name).fill(`${firstName}`)
        await this.page.locator(this.last_name).fill(`${lastName}`)
        await this.page.waitForTimeout(4000)
        await this.page.locator(this.identity_method).click()
        await this.page.locator(this.select_driverslicence).click()
        const driverslicense_number = Math.floor(100000000 + Math.random() * 700000000)
        this.driver_license_number = driverslicense_number.toString()
        console.log("Generated driver's License Number:", this.driver_license_number)
        await this.page.locator(this.drivers_license).fill(this.driver_license_number)
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.state).click()
        await this.page.locator(this.searchState).fill(testdata.state)
        await this.page.locator(this.selectState).click()
        await this.page.locator(this.expiration_date_calender).click()
        await this.page.locator(this.expiration_date_calender_next).click()
        await this.page.locator(this.expiration_date_calender_next).click()
        await this.page.locator(this.expiration_date_calender_next).click()
        await this.page.locator(this.select_expiration_date).click()
        await this.page.locator(this.mm).fill(testdata.mm)
        await this.page.locator(this.dd).fill(testdata.dd)
        await this.page.locator(this.yyyy).fill(testdata.yyyy)
        // Generate random names (e.g., 5-10 characters each)
        const accountPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const accountPhoneNumber = "5677" + accountPhnNumber
        console.log("Generated Account Phone Number:", accountPhoneNumber)
        await this.page.locator(this.mobile_number).click()
        await this.page.locator(this.mobile_number).fill(accountPhoneNumber)
        await this.page.waitForTimeout(2000)
        const enterManuallySS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Enter Manually", enterManuallySS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // Complete your information
    // Enter the information as you want it to appear on your purchase documents.
    async registerTo_individual() {
        await this.page.locator(this.select_individual).click()
        await this.page.waitForTimeout(2000)
        const individualSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Register to Individual", individualSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async registerTo_business(firstName) {
        await this.page.locator(this.select_business).click()
        this.businessName = `${firstName} B-Antiques LLC`
        console.log("Generated Business Name:", this.businessName)
        await this.page.locator(this.business_name).fill(this.businessName)
        const businessPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const einNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const businessPhoneNumber = "6148" + businessPhnNumber
        const einNumberString = einNumber.toString()
        console.log("Generated Business Phone Number:", businessPhoneNumber)
        await this.page.locator(this.business_phone_number).fill(businessPhoneNumber)
        await this.page.locator(this.business_ein_number).fill(einNumberString)
        await this.page.locator(this.relationship_to_business).click()
        await this.page.locator(this.choose_representative).click()
        await this.page.waitForTimeout(2000)
        const businessSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Register to Business", businessSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async registerTo_dealer(firstName) {
        await this.page.locator(this.select_dealer).click()
        this.dealerName = `${firstName} D-Attic Group LLC`
        console.log("Generated Dealer Name:", this.dealerName)
        await this.page.locator(this.dealer_name).fill(this.dealerName)
        const dealerPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const dealerLicenseNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const resaleTaxidNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const dealerPhoneNumber = "6148" + dealerPhnNumber
        const dealerLicenseNumberString = dealerLicenseNumber.toString()
        const resaleTaxidNumberString = resaleTaxidNumber.toString()
        console.log("Generated Dealer Phone Number:", dealerPhoneNumber)
        console.log("Generated Dealer Licence Number:", dealerLicenseNumberString)
        console.log("Generated Resale TaxID Number:", resaleTaxidNumberString)
        await this.page.locator(this.dealer_license_number).fill(dealerLicenseNumberString)
        await this.page.locator(this.dealer_phone_number).fill(dealerPhoneNumber)
        await this.page.locator(this.resale_taxid).fill(resaleTaxidNumberString)
        await this.page.locator(this.dealer_state).click()
        await this.page.locator(this.search_dealer_state).fill(testdata.state)
        await this.page.locator(this.select_dealer_state).click()
        await this.page.locator(this.relationship_to_dealer).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.choose_owner).click()
        await this.page.waitForTimeout(2000)
        const dealerSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Dealer Selected", dealerSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // Enter your Addresses
    // Enter the information as you want it to appear on your purchase documents.
    async enter_addresses() {
        await this.page.locator(this.search_address).click()
        await this.page.locator(this.search_address).fill(testdata.mailing_address)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.select_address).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.search_address).click()
        await this.page.locator(this.search_address).fill(testdata.vehicletitling_address)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.select_address).click()
        await this.page.waitForTimeout(2000)
        const bidderAddressesSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Addresses Entered", bidderAddressesSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async regularBidder_Address() {
        await this.page.locator(this.search_address).click()
        await this.page.locator(this.search_address).fill(testdata.mailing_address)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.select_address).click()
        await this.page.waitForTimeout(2000)
        const regularBidderAddressesSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Regular Bidder Addresses Entered", regularBidderAddressesSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // How will you pay for your vehicle?
    // Indicate below which method of payment you plan to use for your vehicle purchase.
    async desired_BidLimit() {
        const desiredBidLimit = Math.floor(100000 + Math.random() * 900000) // Generates a random 10-digit number
        const desired_Bid_Limit = desiredBidLimit.toString()
        console.log("Generated Desired Bid Limit:", desired_Bid_Limit)
        await this.page.locator(this.desired_bid_limit).click()
        await this.page.locator(this.desired_bid_limit).fill(desired_Bid_Limit)
    }

    async select_biddingCollateral_bidMethod() {
        await this.page.locator(this.biddingCollateral_bidMethod).click()
        await this.page.waitForTimeout(2000)
        const biddingCollateralSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Bidding Collateral Selected", biddingCollateralSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async select_personalCheck_bidMethod() {
        await this.page.locator(this.personalCheck_bidMethod).click()
        const personalFundLetter = testdata.fundletterPath
        await this.page.locator(this.check_bankletter).setInputFiles(personalFundLetter)
        await this.page.waitForTimeout(2000)
        const personalCheckSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Personal Check Selected", personalCheckSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async select_businessCheck_bidMethod() {
        await this.page.locator(this.businessCheck_bidMethod).click()
        const businessFundLetter = testdata.fundletterPath
        await this.page.locator(this.check_bankletter).setInputFiles(businessFundLetter)
        await this.page.waitForTimeout(2000)
        const businessCheckSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Business Check Selected", businessCheckSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async select_wireTransfer_bidMethod() {
        await this.page.locator(this.wireTransfer_bidMethod).click()
        const wireTransferFundLetter = testdata.fundletterPath
        await this.page.locator(this.check_bankletter).setInputFiles(wireTransferFundLetter)
        await this.page.waitForTimeout(2000)
        const wireTransferSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Wire Transfer Selected", wireTransferSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async select_CreditCardHold_bidMethod() {
        await this.page.locator(this.CreditCardHold_bidMethod).click()
        await this.page.waitForTimeout(2000)
        const creditCardHoldSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Credit Card Hold Selected", creditCardHoldSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async select_chooseLater_bidMethod() {
        await this.page.locator(this.chooseLater_bidMethod).click()
        await this.page.waitForTimeout(2000)
        const chooseLaterSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Choose Later Selected", chooseLaterSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // Add additional documents
    // We need your documents to support your registration.
    async customer_documents() {
        await this.page.waitForTimeout(3000)
        const customerPhoto = testdata.customerPhotoPath
        await this.page.locator(this.customer_photo).setInputFiles(customerPhoto)
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.cropImage).click()
        const insuranceDocument = testdata.InsurancePath
        await this.page.locator(this.insurance).setInputFiles(insuranceDocument)
        await this.page.locator(this.insurance_calendar).click()
        await this.page.locator(this.insurance_calendar_next).click()
        await this.page.locator(this.insurance_calendar_next).click()
        await this.page.locator(this.insurance_calendar_next).click()
        await this.page.locator(this.select_insurance_date).click()
        await this.page.waitForTimeout(2000)
        const customerDocumentsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Customer Documents Uploaded", customerDocumentsSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async business_document() {
        const businessDocument = testdata.businessLicensePath
        await this.page.locator(this.upload_business_licence_document).setInputFiles(businessDocument)
        await this.page.waitForTimeout(4000)
        const businessDocumentSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Business Document Uploaded", businessDocumentSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async dealer_documents() {
        await this.page.waitForTimeout(8000)
        const dealerDocument = testdata.dealerLicensePath
        await this.page.locator(this.upload_dealer_licence_document).setInputFiles(dealerDocument)
        await this.page.locator(this.dealer_calendar).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_licence_select_date).click()
        const resaleDocument = testdata.resaleLicensePath
        await this.page.locator(this.upload_dealer_licence_document).setInputFiles(resaleDocument)
        await this.page.locator(this.resale_calendar).click()
        await this.page.locator(this.resale_calendar_next).click()
        await this.page.locator(this.resale_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.dealer_calendar_next).click()
        await this.page.locator(this.resale_licence_select_date).click()
        const verificationOfOwnershipDocument = testdata.verificationOfOwnershipPath
        await this.page.locator(this.upload_verification_of_ownership_document).setInputFiles(verificationOfOwnershipDocument)
        await this.page.waitForTimeout(2000)
        const authorizationToBidDocument = testdata.authorizationToBidPath
        await this.page.locator(this.upload_authorization_to_bid).setInputFiles(authorizationToBidDocument)
        await this.page.waitForTimeout(4000)
        const dealerDocumentsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Dealer Documents Uploaded", dealerDocumentsSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // Enhance your auction experience
    // If you have more than one guest, please select from the options below  
    async addProducts() {
        await this.page.locator(this.tr1product).click()
        await this.page.locator(this.tr2product).click()
        await this.page.locator(this.tr3product).click()
        await this.page.locator(this.tr4product).click()
        // await this.page.locator(this.tr5product).click()
        await this.page.waitForTimeout(2000)
        const addProductsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Products Added", addProductsSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    async without_Products() {
        await this.page.waitForTimeout(9000)
        await this.page.locator(this.next_button).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.confirmRegistration).click()
        await this.page.waitForTimeout(48000)
    }

    async addProducts_for_SelectPackage() {
        await this.page.locator(this.tr1product).click()
        await this.page.locator(this.tr2product).click()
        await this.page.locator(this.tr3product).click()
        await this.page.locator(this.tr4product).click()
        await this.page.waitForTimeout(2000)
        const addProductsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Products Added", addProductsSS, "image/png");
        await this.page.locator(this.next_button).click()
    }

    // Let's proceed with payment
    // Complete your payment and finalize your initial registration.
    async proceedWithPayment(cardNumber, expiryDate, cvv) {
        await this.page.locator(this.selectExistingAddress).click()
        await this.page.locator(this.selectMailingAddress).click()
        await this.page.locator(this.confirmselection).click()
        await this.page.waitForTimeout(4000)
        const frame = await this.page.frameLocator("xpath=//iframe[@title='Secure Credit Card Form']")
        if (!frame) throw new Error('Iframe not found')
        await frame.locator(this.card_number).fill(cardNumber)
        await frame.locator(this.expiration_date_mmyy).fill(expiryDate)
        await frame.locator(this.card_cvv).fill(cvv)
        await frame.locator(this.postalcode).fill(testdata.postalcode)
        await this.page.waitForTimeout(2000)
        const addCardDetailsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Card Details Added", addCardDetailsSS, "image/png");
        await this.page.locator(this.click_pay_for_registration).click()
        await this.page.waitForTimeout(48000)
    }

    // Review & sign your bidder agreement
    // This will take place with an e-signature via DocuSign
    async docuSign() {
        const frame = await this.page.frameLocator(this.libraryFrame)
        const frame1 = await frame.frameLocator(this.docuSignFrame)
        if (!frame1) throw new Error('Iframe not found')
        await frame1.locator(this.agree_signature).click()
        await this.page.waitForTimeout(3000)
        await frame1.locator(this.continue_button).click()
        await frame1.locator(this.click_sign).click()
        await this.page.waitForTimeout(3000)
        await frame1.locator(this.adopt_and_sign).click()
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.initial1).click()
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.initial2).click()
        await this.page.waitForTimeout(2000)
        const docuSignDocumentSignedSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("DocuSign Document Signed", docuSignDocumentSignedSS, "image/png");
        await frame.locator(this.submit_application).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.view_my_agreement).click()
        await this.page.waitForTimeout(15000)
        const viewAgreementSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("View Agreement", viewAgreementSS, "image/png");
    }

    async absenteeBidder_docuSign(firstName, lastName) {
        const frame = await this.page.frameLocator(this.libraryFrame)
        const frame1 = await frame.frameLocator(this.docuSignFrame)
        if (!frame1) throw new Error('Iframe not found')
        await frame1.locator(this.agree_signature).click()
        await this.page.waitForTimeout(3000)
        await frame1.locator(this.continue_button).click()
        await frame1.locator(this.click_sign).click()
        await this.page.waitForTimeout(3000)
        await frame1.locator(this.adopt_and_sign).click()
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.initial1).click()
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.initial2).click()
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.printName).fill(`${firstName} ${lastName}`)
        await this.page.waitForTimeout(2000)
        await frame1.locator(this.signatureRequired).click()
        await this.page.waitForTimeout(2000)
        const docuSignDocumentSignedSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("DocuSign Document Signed", docuSignDocumentSignedSS, "image/png")
        await frame.locator(this.submit_application).click()
        await this.page.waitForTimeout(10000)

        //CC Hold Page - Add Card Details
        await this.page.locator(this.selectExistingAddress).click()
        await this.page.locator(this.selectMailingAddress).click()
        await this.page.locator(this.confirmselection).click()
        await this.page.waitForTimeout(4000)
        const CCHoldframe = await this.page.frameLocator("xpath=//iframe[@title='Secure Credit Card Form']")
        if (!CCHoldframe) throw new Error('Iframe not found')
        await CCHoldframe.locator(this.card_number).fill(testdata.CC_CardNumber)
        await CCHoldframe.locator(this.expiration_date_mmyy).fill(testdata.CC_ExpirationDate)
        await CCHoldframe.locator(this.card_cvv).fill(testdata.CC_CVV)
        const addressPostalCode = await this.page.locator(this.addressPostalCode).inputValue()
        console.log("Extracted Postal Code from Address:", addressPostalCode)
        await CCHoldframe.locator(this.postalcode).fill(addressPostalCode)
        await this.page.waitForTimeout(2000)
        const addCardDetailsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Card Details Added", addCardDetailsSS, "image/png");
        await this.page.locator(this.next_button).click()
        await this.page.waitForTimeout(10000)
        await this.page.locator(this.view_my_agreement).click()
        await this.page.waitForTimeout(20000)
        const viewAgreementSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("View Agreement", viewAgreementSS, "image/png");
    }

    async view_agreement() {
        await this.page.waitForTimeout(10000)
        await this.page.locator(this.view_my_agreement).click()
        await this.page.waitForTimeout(20000)
        const viewAgreementSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("View Agreement", viewAgreementSS, "image/png");
    }
}