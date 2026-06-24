import { expect } from '@playwright/test'
import testdata from '../../tests/datasource/testdata.json' with { type: 'json' };

class MerchandiseConsignment {
    constructor(page) {
        this.page = page

        this.Add_new_Item_Button = "//button[.='Add new merchandise']"
        this.Item_Title_Describe = "//input[@name='items.0.title']"
        this.Item_Estimated_Value = "//input[@aria-roledescription='Number field']"
        this.Additional_details = "//textarea[@name='items.0.additionalDetails']"
        this.Upload_Photos = "//input[@type='file']"
        this.Item1_Title_Describe = "//input[@name='items.1.title']"
        this.Item1_Estimated_Value = "(//input[@aria-roledescription='Number field'])[2]"
        this.Item1_Additional_details = "//textarea[@name='items.1.additionalDetails']"
        this.Upload_Photos1 = "(//input[@type='file'])[2]"
        this.Item2_Title_Describe = "//input[@name='items.2.title']"
        this.Item2_Estimated_Value = "(//input[@aria-roledescription='Number field'])[3]"
        this.Item2_Additional_details = "//textarea[@name='items.2.additionalDetails']"
        this.Upload_Photos2 = "(//input[@type='file'])[3]"
        this.UploadAllPhotos_Button = "//button[contains(.,'Upload all')]"
        this.add_another_item = "//button[.='Add another item']"
        this.Next_Button = "//button[.='Next']"

        this.Phone_Number = "//input[@name='phone.phoneNumber']"
        this.Address_search = "//input[@name='addressSearch']"
        this.select_first_one = "//div[@role='listbox']/div[1]"
        this.eSignature = "//input[@name='signatureName']"
        this.calendar = "//button[@aria-label='Calendar']"
        this.dateFocused = "//div[@data-focused='true']"
        this.Submit_Merchandise_Application = "//button[@type='submit']/span[text()='Submit application']"
    }

    async setUp_Merchandise_Consignment(url) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(url)
    }

    async AddMerchandise() {
        await expect(this.page.locator(this.Add_new_Item_Button)).toBeVisible({ timeout: 100000 })
        this.page.locator(this.Add_new_Item_Button).click()

        await this.page.locator(this.Item_Title_Describe).fill(testdata.item)
        const randomEstimateValue = Math.floor(10000 + Math.random() * 50000) // Generates a random 6-digit number
        this.itemEstimateValue = randomEstimateValue.toString();
        console.log("Generated Estimate Worth:", this.itemEstimateValue)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.Item_Estimated_Value).click()
        await this.page.locator(this.Item_Estimated_Value).fill(this.itemEstimateValue)
        await this.page.locator(this.Additional_details).fill(testdata.description)
        const item1PhotoPaths = [
            testdata.Merchandise1,
            testdata.Merchandise2,
            testdata.Merchandise3
        ];
        await this.page.locator(this.Upload_Photos).setInputFiles(item1PhotoPaths);
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.UploadAllPhotos_Button).click()
        await this.page.waitForTimeout(10000)

        await this.page.screenshot({ path: './screenshots/merchandise/1_merchandiseItem.png', fullPage: true })

        await this.page.locator(this.add_another_item).click()
        await this.page.waitForTimeout(2000)

        await this.page.locator(this.Item1_Title_Describe).fill(testdata.item1)
        const randomEstimateValue1 = Math.floor(10000 + Math.random() * 50000) // Generates a random 6-digit number
        this.item1EstimateValue = randomEstimateValue1.toString();
        console.log("Generated Estimate Worth:", this.item1EstimateValue)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.Item1_Estimated_Value).click()
        await this.page.locator(this.Item1_Estimated_Value).fill(this.item1EstimateValue)
        await this.page.locator(this.Item1_Additional_details).fill(testdata.description1)
        const item2PhotoPaths = [
            testdata.Merchandise4,
            testdata.Merchandise5,
            testdata.Merchandise6
        ];
        await this.page.locator(this.Upload_Photos1).setInputFiles(item2PhotoPaths);
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.UploadAllPhotos_Button).click()
        await this.page.waitForTimeout(10000)
        await this.page.screenshot({ path: './screenshots/merchandise/2_merchandiseItem.png', fullPage: true })

        await this.page.locator(this.add_another_item).click()
        await this.page.waitForTimeout(2000)

        await this.page.locator(this.Item2_Title_Describe).fill(testdata.item2)
        const randomEstimateValue2 = Math.floor(10000 + Math.random() * 50000) // Generates a random 6-digit number
        this.item2EstimateValue = randomEstimateValue2.toString();
        console.log("Generated Estimate Worth:", this.item2EstimateValue)
        await this.page.waitForTimeout(3000)
        await this.page.locator(this.Item2_Estimated_Value).click()
        await this.page.locator(this.Item2_Estimated_Value).fill(this.item2EstimateValue)
        await this.page.locator(this.Item2_Additional_details).fill(testdata.description2)
        const item3PhotoPaths = [
            testdata.Merchandise7,
            testdata.Merchandise8,
            testdata.Merchandise9
        ];
        await this.page.locator(this.Upload_Photos2).setInputFiles(item3PhotoPaths);
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.UploadAllPhotos_Button).click()
        await this.page.waitForTimeout(10000)
        await this.page.screenshot({ path: './screenshots/merchandise/3_merchandiseItem.png', fullPage: true })

        await this.page.locator(this.Next_Button).click()
    }

    async MerchandiseContactInfo(firstName) {
        await this.page.waitForTimeout(3000)
        const personalContactNum = Math.floor(100000 + Math.random() * 900000)
        const perContactNumber = "6145" + personalContactNum
        console.log("Generated Personal Phone Number:", perContactNumber)
        await this.page.locator(this.Phone_Number).fill(perContactNumber)
        await this.page.locator(this.Address_search).click()
        await this.page.locator(this.Address_search).fill(testdata.enterPersonalAddress)
        await this.page.waitForSelector(this.select_first_one, { state: 'visible' })
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.select_first_one).click()
        await this.page.screenshot({ path: './screenshots/merchandise/4_merchandiseContactInfo.png', fullPage: true })
        await this.page.locator(this.Next_Button).click()
        await this.page.locator(this.eSignature).fill(`${firstName}`)
        await this.page.locator(this.calendar).click()
        await this.page.locator(this.dateFocused).click()
        await this.page.screenshot({ path: './screenshots/merchandise/5_merchandiseReviewPage.png', fullPage: true })
        await this.page.locator(this.Submit_Merchandise_Application).click()
        await this.page.waitForTimeout(5000)
    }
}

module.exports = { MerchandiseConsignment }