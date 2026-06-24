import { parse } from "csv-parse/sync"
import fs from 'fs'

export class vehicleDetails {
    constructor(page) {
        this.page = page

        this.nextButton = "//button[@type='submit']//span[text()='Next']"
        this.odometer = "//input[@aria-roledescription='Number field']"
        this.condition = "//span[text()='What is the condition of your vehicle?']/parent::div/following-sibling::button"
        this.selectCondition = "//div[@role='listbox']//span[text()='Restored Original']" // Original, Modified Original, Restomod, Completely Custom
        this.originEngine = "(//label[@data-react-aria-pressable='true']//div)[2]"  //"(//div[text()='Yes'])[1]"
        this.horsepower = "(//label[@data-react-aria-pressable='true']//div)[3]"

        this.shortDescription = "//textarea[@name='shortDescriptionText']"
        this.input1 = "//input[@aria-label='Vehicle details, item 1']"
        this.input2 = "//input[@aria-label='Vehicle details, item 2']"
        this.input3 = "//input[@aria-label='Vehicle details, item 3']"
        this.input4 = "//input[@aria-label='Vehicle details, item 4']"
        this.input5 = "//input[@aria-label='Vehicle details, item 5']"
        this.longDescription = "//textarea[@name='longDescription']"
        this.clickOnHeader = "//h1[contains(.,'Describe your vehicle to bidders')]"

        this.uploadphotos = "//input[@type='file']"
        this.uploadAllButton = "//button[contains(.,'Upload all')]"
        this.pagefootertextclick = "(//div//p)[10]"
    }

    async vehicleCondition() {
        await this.page.locator(this.condition).click()
        await this.page.waitForSelector(this.selectCondition, { state: 'visible' })
        await this.page.locator(this.selectCondition).click()
        await this.page.locator(this.originEngine).click()
        await this.page.locator(this.horsepower).click()
        await this.page.waitForTimeout(2000)
        await this.page.screenshot({ path: './screenshots/consignment/4_vehiclecondition.png', fullPage: true })
        await this.page.locator(this.nextButton).click()
    }

    // async vehicleDescriptionsPalmBeach(year) {
    //     const currentYear = new Date().getFullYear();
    //     const cutoffYear = currentYear - 15;
    //     try {
    //         if (parseInt(year) >= cutoffYear) {
    //             const odometerfield = await this.page.locator(this.odometer)
    //             const randomOdometer = Math.floor(10000 + Math.random() * 50000) // Generates a random 10-digit number
    //             const estimateOdometer = randomOdometer.toString()
    //             console.log("Generated Estimate Odometer:", estimateOdometer)
    //             // Only fill odometer if year >= cutoffYear
    //             if (odometerfield.isVisible()) {
    //                 await this.page.locator(this.odometer).click();
    //                 await this.page.locator(this.odometer).fill(estimateOdometer);
    //             } else {
    //                 console.log("Odometer field is not visible, skipping odometer input.");
    //             }
    //         } else {
    //             console.log(`Vehicle year ${year} is more than 15 years old as of ${currentYear}, so the odometer is skipped.`);
    //         }
    //     } catch (error) {
    //         console.warn(`⚠️ Odometer interaction skipped due to error: ${error.message}`);
    //     }
    //     await this.page.locator(this.input1).fill(testdata.input1)
    //     await this.page.locator(this.input2).fill(testdata.input2)
    //     await this.page.locator(this.input3).fill(testdata.input3)
    //     await this.page.locator(this.input4).fill(testdata.input4)
    //     await this.page.locator(this.input5).fill(testdata.input5)
    //     await this.page.locator(this.longDescription).fill(testdata.longDescription)
    //     await this.page.waitForTimeout(4000)
    //     await this.page.screenshot({ path: './screenshots/consignment/descriptionsPalmBeach.png', fullPage: true })
    //     await this.page.locator(this.nextButton).click()
    // }

    async vehicleDescriptionsScottsdale(year, shortDescription, longDescription) {
        const currentYear = new Date().getFullYear();
        const cutoffYear = currentYear - 15;
        try {
            if (parseInt(year) >= cutoffYear) {
                // Only fill odometer if year >= cutoffYear
                const odometerfield = await this.page.locator(this.odometer)
                const randomOdometer = Math.floor(10000 + Math.random() * 50000) // Generates a random 10-digit number
                const estimateOdometer = randomOdometer.toString()
                console.log("Generated Estimate Odometer:", estimateOdometer)
                if (odometerfield.isVisible()) {
                    await this.page.locator(this.odometer).click();
                    await this.page.locator(this.odometer).fill(estimateOdometer);
                } else {
                    console.log("Odometer field is not visible, skipping odometer input.");
                }
            } else {
                console.log(`Vehicle year ${year} is more than 15 years old as of ${currentYear}, so the odometer is skipped.`);
            }
        } catch (error) {
            console.warn(`⚠️ Odometer interaction skipped due to error: ${error.message}`);
        }
        await this.page.locator(this.shortDescription).fill(shortDescription)
        await this.page.locator(this.longDescription).fill(longDescription)
        await this.page.waitForTimeout(2000)
        await this.page.screenshot({ path: './screenshots/consignment/5_descriptionsSD.png', fullPage: true })
        await this.page.locator(this.nextButton).click()
    }

    async vehiclePhotos() {

        const rows = parse(fs.readFileSync('tests/datasource/consignmentSetUp/files.csv'), {
            columns: true,
            skip_empty_lines: true
        });

        const uploadPhotos = rows.map(row => row.filepath);

        // const uploadPhotos = [
        //     photoData.frontImage,
        //     photoData.rearImage,
        //     photoData.sideImage,
        //     photoData.interiorImage,
        //     photoData.exteriorImage,
        //     // photo.vinImage,
        //     // photo.odometerImage
        // ]

        await this.page.waitForTimeout(5000)
        await this.page.locator(this.uploadphotos).setInputFiles(uploadPhotos)
        await this.page.waitForTimeout(5000)
        // Race condition: whichever appears first
        try {
            if (await this.page.locator(this.uploadAllButton).isVisible()) {
                console.log("⚠️ Some photos did not meet requirements. Clicking Upload All Photos...");
                await this.page.locator(this.uploadAllButton).click();
            } else {
                console.log("✅ All photos meet requirements. No pop-up shown.");
            }
        } catch (error) {
            console.warn(`⚠️ Could not check Upload All button: ${error.message}`);
        }
        await this.page.locator(this.pagefootertextclick).evaluate(el => el.scrollIntoView());
        await this.page.waitForTimeout(110000)
        await this.page.screenshot({ path: './screenshots/consignment/6_vehiclephotos.png', fullPage: true })
        await this.page.locator(this.nextButton).click()
    }
}