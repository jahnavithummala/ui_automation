import { expect } from '@playwright/test';
import * as allure from "allure-js-commons";

export class addVIN {
    constructor(page) {
        this.page = page
        this.vin = "//input[@aria-label='Enter VIN']" // VIN Input
        this.vinError = "//span[@slot='errorMessage']" // VIN Error Message
        this.nextButton = "//button[@type='submit']//span[text()='Next']"

        this.year = "//input[@aria-roledescription='Number field']"
        this.make = "//span[text()='Make']/parent::div/following-sibling::button" //"(//input[@type='text'])[3]"
        this.searchMakeModel = "//input[@aria-label='Search']"
        this.selectPreference = "//div[@aria-label='Suggestions']//div[1]"
        this.model = "//span[text()='Model']/parent::div/following-sibling::button" //"(//input[@type='text'])[4]"
        this.style = "//input[@name='style']"
        this.engine = "//input[@name='engine']"
        this.exteriorColor = "//input[@name='exteriorColor']"
        this.interiorColor = "//input[@name='interiorColor']"
        this.powerSource = "//span[text()='Power source']/parent::div/following-sibling::button"
        this.selectPowerSource = "//span[normalize-space(text())='Gasoline']" //"//div[@role='listbox']//span[text()='Gasoline']" // Gasoline-2, Diesel-3, Hybrid-4, Electric-5
        this.cylinders = "//span[text()='Cylinders']/parent::div/following-sibling::button"
        this.selectCylinders = "//div[@role='listbox']//span[text()='8']" // 1, 2, 3, 4, 6, 8, 10, 12, Other
        this.transmissionSpeed = "//span[text()='Transmission speeds']/parent::div/following-sibling::button"
        this.selectTransmissionSpeed = "//div[@role='listbox']//span[text()='4-Speed']" // CVT, 1-Speed, 12-Speed, Other
        this.transmissionType = "//span[text()='Transmission type']/parent::div/following-sibling::button"
        this.selectTransmissionType = "//div[@role='listbox']//span[text()='Automatic with Manual mode']" // Automatic, Automatic with Manual mode, Manual
        this.vinCheckbox = "(//span[contains(.,'This info is correct')])[2]"
    }

    async enterVIN(length) {
        //VIN Enter
        await this.page.waitForTimeout(3000)
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

        let randomVIN = "";
        for (let i = 0; i < length; i++) {
            randomVIN += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.generatedVIN = randomVIN
        // Fill the form fields with the generated names
        await this.page.locator(this.vin).click()
        await this.page.locator(this.vin).fill(this.generatedVIN)
        console.log(`Generated VIN (${length} chars): ${this.generatedVIN}`);
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.nextButton).click()
        if (length > 17) {
            await expect(this.page.locator(this.vinError)).toBeVisible();
        }
        return this.generatedVIN;
    }

    async vehicleInformation(year, make, model, style, engine, exteriorColor, interiorColor) {
        await this.page.waitForTimeout(4000)
        await this.page.locator(this.year).fill(year)
        await this.page.locator(this.make).click();
        await this.page.locator(this.searchMakeModel).fill(make);

        await this.page.locator(this.selectPreference).first().waitFor({ state: 'visible' });
        await this.page.locator(this.selectPreference).first().click();

        await this.page.locator(this.model).click();
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.searchMakeModel).fill(model);

        await this.page.locator(this.selectPreference).first().waitFor({ state: 'visible' });
        await this.page.locator(this.selectPreference).first().click();
        await this.page.locator(this.style).fill(style)
        await this.page.waitForSelector(this.powerSource, { state: 'visible' })
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.powerSource).click()
        await this.page.waitForSelector(this.selectPowerSource, { state: 'visible' })
        await this.page.locator(this.selectPowerSource).click()
        await this.page.locator(this.engine).fill(engine)
        await this.page.locator(this.cylinders).click()
        await this.page.waitForSelector(this.selectCylinders, { state: 'visible' })
        await this.page.locator(this.selectCylinders).click()
        await this.page.locator(this.transmissionType).click()
        await this.page.waitForSelector(this.selectTransmissionType, { state: 'visible' })
        await this.page.locator(this.selectTransmissionType).click()
        await this.page.locator(this.transmissionSpeed).click()
        await this.page.waitForSelector(this.selectTransmissionSpeed, { state: 'visible' })
        await this.page.locator(this.selectTransmissionSpeed).click()
        await this.page.locator(this.exteriorColor).fill(exteriorColor)
        await this.page.locator(this.interiorColor).fill(interiorColor)
        await this.page.locator(this.vinCheckbox).click()
        await this.page.waitForTimeout(2000)
        const vehicleInformationSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Vehicle Information Entered", vehicleInformationSS, "image/png");
        await this.page.locator(this.nextButton).click()
    }

    async clickNext() {
        await this.page.waitForTimeout(9000)
        await this.page.locator(this.nextButton).click()
    }
}