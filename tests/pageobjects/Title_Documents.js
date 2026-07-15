import testdata from '../../tests/datasource/testdata.json' with { type: 'json' };
import * as allure from "allure-js-commons";

export class titledDocuments {
    constructor(page) {
        this.page = page

        this.nextButton = "//button[@type='submit']//span[text()='Next']"
        this.vehicleTitledDropdown = "//span[text()='How is the vehicle titled?']/parent::div/following-sibling::button"
        this.selectIndividual = "//div[@role='listbox']//span[text()='Individual']"
        this.selectTrust = "//div[@role='listbox']//span[text()='Trust']"
        this.selectBusiness = "//div[@role='listbox']//span[text()='Business']"
        this.selectDealer = "//div[@role='listbox']//span[text()='Dealer']"

        this.vehicleTitledTo = "//input[@name='vehicleTitledTo']"
        this.documents = "(//input[@type='file'])[1]"
        this.einNumber = "//input[@name='ein']"
        this.dealerNumber = "//input[@name='dealerNumber']"

        this.companyPhoneNumber = "//input[@name='businessNumber']"
        this.addressSearch = "//input[@name='addressSearch']"
        this.selectFirstOne = "//div[@role='listbox']/div[1]"
        this.companyDocuments = "(//input[@type='file'])[1]"
        this.namedOperatingAgreement = "//div[text()='Yes']"
        this.dealerExpirationDate = "(//button[@aria-label='Calendar'])[1]"
        this.clickNextOnCalendar = "(//button[@aria-label='Next'])[1]"
        this.selectDate = "//table[@role='grid']//tr[3]/td[4]"
        this.dealerState = "(//span[text()='State']/parent::div/following-sibling::button)[2]"
        this.searchState = "//input[@aria-label='Search']"
        this.selectPreference = "//div[@aria-label='Suggestions']//div[1]"
        this.taxId = "//input[@name='taxId']"
        this.taxIdExpirationDate = "(//button[@aria-label='Calendar'])[2]"
        this.taxIdState = "(//span[text()='State']/parent::div/following-sibling::button)[3]"

        //Applicant Info
        this.personalContactNumber = "//input[@name='contactNumber']"
        this.personalAddressSearch = "//input[@name='addressSearch']"
        this.firstNameField = "//input[@name='firstName']"
        this.lastNameField = "//input[@name='lastName']"
        this.emailField = "//input[@name='email']"
        this.contactNumberField = "//input[@name='contactNumber']"

        //lets finish this application
        this.estimateWorth = "//input[@type='text']"
        this.consignmentSpecialist = "//span[text()='Are you currently working with a consignment specialist?']/parent::div/following-sibling::button"
        this.selectConsignmentSpecialist = "//div[@role='listbox']/div[1]"
        this.auctions = "//span[text()='Would you consider consigning at another one of our auctions?']/parent::div/following-sibling::button"  // Would you consider consigning at another one of our auctions?
        this.selectAuctionYesOrNo = "//div[@role='listbox']//span[text()='Yes']" // Yes

        //submit Application
        this.eSignature = "//input[@name='name']"
        this.calendar = "//button[@aria-label='Calendar']"
        this.dateFocused = "//div[@data-focused='true']"
        this.submitApplication = "//button[@type='submit']/span[text()='Submit application']"

        //start Another Application
        this.startAnotherApplication = "//span[text()='Start another application']"
        this.viewMySubmission = "//span[text()='View my submission']"
    }

    async addIndiTitledTo() {
        await this.page.waitForTimeout(5000)
        await this.page.locator(this.vehicleTitledDropdown).click()
        await this.page.waitForSelector(this.selectIndividual, { state: 'visible' })
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.selectIndividual).click()
    }

    async vehicleDocuments() {
        await this.page.waitForTimeout(3000)
        const frontOfTitle = testdata.titlefrontPath
        const backOfTitle = testdata.titlebackPath
        await this.page.locator(this.documents).setInputFiles(frontOfTitle)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.documents).setInputFiles(backOfTitle)
        await this.page.waitForTimeout(4000)
        const titleToSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Title Documents", titleToSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async addTrustTitledTo(firstName, lastName) {
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.vehicleTitledDropdown).click()
        await this.page.waitForSelector(this.selectTrust, { state: 'visible' })
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.selectTrust).click()
        this.trustTitledTo = `${firstName} ${lastName} Trust`
        await this.page.locator(this.vehicleTitledTo).click()
        await this.page.locator(this.vehicleTitledTo).fill(this.trustTitledTo)
        console.log("Generated Trust Name:", this.trustTitledTo)
        const trustDocument = testdata.trustDocumentPath
        await this.page.locator(this.documents).setInputFiles(trustDocument)
    }

    async addBusinessTitledTo(firstName) {
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.vehicleTitledDropdown).click()
        await this.page.waitForSelector(this.selectBusiness, { state: 'visible' })
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.selectBusiness).click()
        const businessTitledTo = `${firstName} B-Auto Store LLC`
        await this.page.locator(this.vehicleTitledTo).click()
        await this.page.locator(this.vehicleTitledTo).fill(businessTitledTo)
        console.log("Generated Business Name:", businessTitledTo)
        const randomBusinessNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const businessNumber = randomBusinessNumber.toString()
        console.log("Generated Business Number:", businessNumber)
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.einNumber).click()
        await this.page.locator(this.einNumber).fill(businessNumber)
    }

    async businessInformation() {
        await this.page.waitForTimeout(5000)
        const businessPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const businessPhoneNumber = "5677" + businessPhnNumber
        console.log("Generated Business Phone Number:", businessPhoneNumber)
        await this.page.locator(this.companyPhoneNumber).click()
        await this.page.locator(this.companyPhoneNumber).fill(businessPhoneNumber)
        await this.page.locator(this.addressSearch).click()
        await this.page.locator(this.addressSearch).fill(testdata.enterBusinessAddress)
        await this.page.waitForSelector(this.selectFirstOne, { state: 'visible' })
        await this.page.waitForTimeout(1500)
        await this.page.locator(this.selectFirstOne).click()
        const OperatingAgreement = testdata.operatingAgreementPath
        await this.page.locator(this.companyDocuments).setInputFiles(OperatingAgreement)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.namedOperatingAgreement).click()
        await this.page.waitForTimeout(5000)
        const businessInformationSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Business Information", businessInformationSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async addDealerTitledTo(firstName) {
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.vehicleTitledDropdown).click()
        await this.page.waitForSelector(this.selectDealer, { state: 'visible' })
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.selectDealer).click()
        const dealerTitledTo = `${firstName} D-VSSS Arrow Cars LLC`
        await this.page.locator(this.vehicleTitledTo).click()
        await this.page.locator(this.vehicleTitledTo).fill(dealerTitledTo)
        console.log("Generated Dealer Name:", dealerTitledTo)
        const randomDealerNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const dealerNumber = randomDealerNumber.toString()
        console.log("Generated Dealer Number:", dealerNumber)
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.dealerNumber).click()
        await this.page.locator(this.dealerNumber).fill(dealerNumber)
    }

    async dealerInformation() {
        await this.page.waitForTimeout(3000)
        const dealerPhnNumber = Math.floor(100000 + Math.random() * 900000)
        const dealerPhoneNumber = "5674" + dealerPhnNumber
        console.log("Generated Dealer Phone Number:", dealerPhoneNumber)
        await this.page.locator(this.companyPhoneNumber).click()
        await this.page.locator(this.companyPhoneNumber).fill(dealerPhoneNumber)
        await this.page.locator(this.addressSearch).click()
        await this.page.locator(this.addressSearch).fill(testdata.enterDealerAddress)
        await this.page.waitForSelector(this.selectFirstOne, { state: 'visible' })
        await this.page.waitForTimeout(1500)
        await this.page.locator(this.selectFirstOne).click()
        const DealerLicense = testdata.dealerLicensePath
        const ResaleLicense = testdata.resaleLicensePath
        const OperatingAgreement = testdata.operatingAgreementPath
        await this.page.locator(this.companyDocuments).setInputFiles(DealerLicense)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.companyDocuments).setInputFiles(ResaleLicense)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.companyDocuments).setInputFiles(OperatingAgreement)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.namedOperatingAgreement).click()
        await this.page.waitForTimeout(1500)
        await this.page.locator(this.dealerExpirationDate).click()
        await this.page.locator(this.clickNextOnCalendar).click()
        await this.page.locator(this.clickNextOnCalendar).click()
        await this.page.locator(this.selectDate).click()
        await this.page.locator(this.dealerState).click()
        await this.page.locator(this.searchState).fill(testdata.enterState)
        await this.page.waitForSelector(this.selectPreference, { state: 'visible' })
        await this.page.locator(this.selectPreference).click()
        const randomTaxIdNumber = Math.floor(100000000 + Math.random() * 900000000) // Generates a random 10-digit number
        const taxIdNumber = randomTaxIdNumber.toString()
        console.log("Generated Tax ID Number:", taxIdNumber)
        await this.page.locator(this.taxId).click()
        await this.page.locator(this.taxId).fill(taxIdNumber)
        await this.page.locator(this.taxIdExpirationDate).click()
        await this.page.locator(this.clickNextOnCalendar).click()
        await this.page.locator(this.clickNextOnCalendar).click()
        await this.page.locator(this.selectDate).click()
        await this.page.locator(this.taxIdState).click()
        await this.page.locator(this.searchState).fill(testdata.enterState)
        await this.page.waitForSelector(this.selectPreference, { state: 'visible' })
        await this.page.locator(this.selectPreference).click()
        await this.page.waitForTimeout(2000)
        const dealerInformationSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Dealer Information", dealerInformationSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async enterPersonalInfo() {
        await this.page.waitForTimeout(6000)
        const personalContactNum = Math.floor(100000 + Math.random() * 900000)
        const perContactNumber = "6145" + personalContactNum
        console.log("Generated Personal Phone Number:", perContactNumber)
        await this.page.locator(this.personalContactNumber).click()
        await this.page.locator(this.personalContactNumber).fill(perContactNumber)
        await this.page.locator(this.personalAddressSearch).click()
        await this.page.locator(this.personalAddressSearch).fill(testdata.enterPersonalAddress)
        await this.page.waitForSelector(this.selectFirstOne, { state: 'visible' })
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.selectFirstOne).click()
        await this.page.waitForTimeout(5000)
        const personalInfoSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Personal Information", personalInfoSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async getPersonalInfo() {
        const getfirstName = await this.page.locator(this.firstNameField).inputValue()
        const getlastName = await this.page.locator(this.lastNameField).inputValue()
        const getemail = await this.page.locator(this.emailField).inputValue()
        const getcontactNumber = await this.page.locator(this.contactNumberField).inputValue()
        await this.page.locator(this.nextButton).click()
        return {
            getfirstName,
            getlastName,
            getemail,
            getcontactNumber
        }
    }

    async finishApplication() {
        await this.page.waitForTimeout(15000)
        const randomEstimateWorth = Math.floor(10000 + Math.random() * 50000) // Generates a random 10-digit number
        const estimateWorth = randomEstimateWorth.toString()
        console.log("Generated Estimate Worth:", estimateWorth)
        await this.page.waitForTimeout(8000)
        await this.page.locator(this.estimateWorth).click()
        await this.page.locator(this.estimateWorth).fill(estimateWorth)
        await this.page.locator(this.consignmentSpecialist).click()
        await this.page.waitForSelector(this.selectConsignmentSpecialist, { state: 'visible' })
        await this.page.waitForTimeout(1500)
        await this.page.locator(this.selectConsignmentSpecialist).click()
        await this.page.locator(this.auctions).click()
        await this.page.waitForSelector(this.selectAuctionYesOrNo, { state: 'visible' })
        await this.page.waitForTimeout(1500)
        await this.page.locator(this.selectAuctionYesOrNo).click()
        await this.page.waitForTimeout(3000)
        const finishApplicationSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Finish Application", finishApplicationSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async reviewandsubmitApplication(firstName) {
        await this.page.waitForTimeout(6000)
        await this.page.locator(this.eSignature).click()
        await this.page.locator(this.eSignature).fill(`${firstName}`)
        await this.page.locator(this.calendar).click()
        await this.page.locator(this.dateFocused).click()
        await this.page.waitForTimeout(3000)
        const reviewAndSubmitSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Review and Submit Application", reviewAndSubmitSS, "image/png");
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.submitApplication).click()
    }

    async startAnotherConsignment() {
        await this.page.waitForTimeout(15000)
        await this.page.locator(this.startAnotherApplication).click()
    }

    async viewSubmission() {
        await this.page.waitForTimeout(15000)
        const congratulationsSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Congratulations Page", congratulationsSS, "image/png");
        await this.page.locator(this.viewMySubmission).click()
        await this.page.waitForTimeout(15000)
    }
}