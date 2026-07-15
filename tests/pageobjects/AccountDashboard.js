import { expect } from "@playwright/test";
import { addresses } from "../../constants";
import * as allure from "allure-js-commons";

export class accountDashboard {
    constructor(page) {
        this.page = page;

        this.myAccountButton = "//div[text()='My Account']"
        this.myAccount_Addresses = "//div[text()='Addresses']"
        this.verifyAddressesText = "//span[text()='Addresses']"
        this.addNewAddressButton = "//button[text()='Add new']"
        this.addressSerachField = "//input[@name='addressSearch']"
        this.enterAddressManuallyButton = "//span[text()='Enter address manually']"
        this.selectAdressType = "//span[text()='Select address type']"
        this.selectOption = "//div[@role='option']"
        this.addressLine1 = "//input[@name='addresses.0.addressLine1']"
        this.addressLine2 = "//input[@name='addresses.0.addressLine2']"
        this.countrydropdown = "//span[text()='Country']/parent::div/following-sibling::button"
        this.search = "//input[@aria-label='Search']"
        this.selectPreference = "//div[@aria-label='Suggestions']//div[1]"
        this.enterCity = "//input[@name='addresses.0.city']"
        this.statedropdown = "//span[text()='State']/parent::div/following-sibling::button"
        this.countydropdown = "//span[text()='County']/parent::div/following-sibling::button"
        this.postalCode = "//input[@name='addresses.0.zip']"
        this.saveChangesButton = "//button[text()='Save changes']"

    }

    async addAddressTypesToAccount() {
        await this.page.locator(this.myAccountButton).click()
        await this.page.locator(this.myAccount_Addresses).click()
        await expect(this.page.locator(this.verifyAddressesText)).toHaveText('Addresses')
        for (const address of addresses) {
            await this.page.locator(this.addNewAddressButton).click()
            // Search Address
            await this.page.locator(this.addressSerachField).click();

            await this.page.locator(this.enterAddressManuallyButton).click();

            // Address Type
            await this.page.locator(this.selectAdressType).click();

            await this.page
                .locator(this.selectOption)
                .filter({ hasText: address.type })
                .click();

            await this.page.keyboard.press('Escape')

            // Address Line 1
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.addressLine1).fill(address.address1);

            // Address Line 2
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.addressLine2).fill(address.address2);

            // City
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.enterCity).fill(address.city);

            // Country
            await this.page.locator(this.countrydropdown).click();
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.search).fill(address.country);
            await this.page.locator(this.selectPreference).click();

            // State
            await this.page.locator(this.statedropdown).click();
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.search).fill(address.state);
            await this.page.locator(this.selectPreference).click();

            // County
            await this.page.locator(this.countydropdown).click();
            await this.page.waitForTimeout(2000)
            await this.page.locator(this.search).fill(address.county);
            await this.page.locator(this.selectPreference).click();

            // Postal Code
            await this.page.locator(this.postalCode).fill(address.postalCode);

            // Save
            await this.page.locator(this.saveChangesButton).click();

            // Wait until popup closes
            await this.page.locator(this.addNewAddressButton).waitFor({
                state: "visible"
            })
            console.log(`${address.type} Address Added Successfully`);
        }
        await this.page.waitForTimeout(4000)
        const allAddressesSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("All Address Types Added Successfully", allAddressesSS, "image/png");
        console.log("All Address Types Added Successfully");
    }
}