import dotenv from 'dotenv';
import testData from '../datasource/testdata.json' with { type: 'json' };
import * as allure from "allure-js-commons";

dotenv.config();
const environment = process.env.ENVIRONMENT;
const yopmailUrl = process.env.YOPMAIL_URL;
let email;
let firstName;
let lastName;

export class createAccount {
    constructor(page) {
        this.page = page;

        this.signIn = "//button[@type='button']//span[text()='Sign In']" // SignIn Button
        this.accept = "//button[text()='Accept']"
        this.create = "(//span[@class='truncate'])[1]" // Create Button
        this.firstName = "//input[@name='firstName']" // First Name Input
        this.lastName = "//input[@name='lastName']" // Last Name Input
        this.email = "(//div[contains(@class,'outline-brand-blue-600 outline-offset-2')]//input)[3]" // Email Input
        this.password = "//input[@name='password']" // Password Input
        this.confirmPassword = "//input[@name='confirmPassword']" // Confirm Password Input
        this.termsAndConditions = "//input[@name='agreeToTerms']/following::div[1]" // Check Box
        this.createAccountButton = "//button[@type='button']//span[text()='Create account']" // Create Account Button

        this.loginhyperlink = "//button[contains(.,'please log in here')]" // login hyperlink
        this.loginbutton = "(//span[text()='Log in'])[2]"
        this.loginEmail = "//input[@name='email']"
        this.loginPassword = "//input[@name='password']"
        this.loginButton_Header = "(//span[text()='Log in'])[1]"

        this.logOut = "//button[@aria-label='Log Out']"
        this.logOutButton = "//button[text()='Logout']"

        this.resetEmail = "//input[@name='email']"
        this.enterEmail = "//input[@placeholder='Enter your inbox here']"
        this.checkInbox = "//button[@title='Check Inbox @yopmail.com']"
        this.IframeYopmail = "//iframe[@name='ifmail']"
        this.refreshForInbox = "//button[@id='refresh']"
        this.clickHere = "//a[text()='Click here']"
        this.memberEnterEmail = "//input[@placeholder='your-email@email.com']"
        this.resetPassword = "//span[text()='Reset password']"
        this.forgotPassword = "//button[text()='Forgot password?']"
        this.resetEmail = "//span[text()='Send password reset email']"
    }

    async setUp_Url(envUrl) {
        await this.page.setViewportSize({ width: 1920, height: 940 });
        await this.page.goto(envUrl);
    }

    async login_existingUser(existingCustomer, password) {
        const acceptBtn = this.page.locator(this.accept);
        if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
            await acceptBtn.click();
        }
        //await this.page.waitForTimeout(2000);
        await this.page.locator(this.loginEmail).waitFor({ state: 'visible' });
        await this.page.locator(this.loginEmail).fill(existingCustomer);
        await this.page.locator(this.loginPassword).fill(password);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.loginbutton).click();
    }

    async createAcc(environment, password) {
        //await this.page.waitForTimeout(3000);
        await this.page.locator(this.accept).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.create).click();
        function generateRandomString(length) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
        const randomName = generateRandomString(3);
        firstName = "Janhavi" + randomName;
        lastName = "Sai" + randomName;

        function generateBJEmail(environment) {
            var domain = "bjac@yopmail.com";
            var date = new Date();

            const year = date.getFullYear().toString().slice(-2);
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const hour = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const second = date.getSeconds().toString().padStart(2, "0");

            const time = day + month + year + hour + minutes + second;

            return `${environment.toUpperCase()}${time}${domain}`;
        }

        email = generateBJEmail(environment);

        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.email).click();
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.confirmPassword).fill(password);
        await this.page.locator(this.termsAndConditions).check();
        const createAccountSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Create Account Details", createAccountSS, "image/png");
        //await this.page.screenshot({ path: './ScreenShot/1 CreateAccountDetails.png', fullPage: true })
        await this.page.locator(this.createAccountButton).click()
        //await this.page.pause(20000)
        // await this.page.locator(this.createAccWebElements.loginhyperlink).click();
        // await this.page.locator(this.createAccWebElements.loginbutton).click();
        await this.page.waitForTimeout(5000);

        return {
            email,
            firstName,
            lastName
        };
    }

    async logOut_Account() {
        await this.page.locator(this.logOut).click()
        await this.page.waitForTimeout(5000)
        const logOutSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("LogOut", logOutSS, "image/png");
        //await this.page.screenshot({ path: './ScreenShot/6 LogOut.png', fullPage: true })
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.logOutButton).click()
        await this.page.waitForTimeout(4000)
        const homeScreenSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Home Screen", homeScreenSS, "image/png");
    }

    async forgot_Password() {
        await this.page.waitForTimeout(2000)
        //await this.page.setViewportSize({ width: 1920, height: 1080 });
        // await this.page.screenshot({ path: './ScreenShot/3 PleaseLoginScreen.png', fullPage: true })
        // await this.page.locator(this.loginButton_Header).click()
        //await this.page.waitForTimeout(2000)
        await this.page.locator(this.loginhyperlink).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.forgotPassword).click()
        await this.page.waitForTimeout(4000)
        const forgotPasswordSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Forgot Password Screen", forgotPasswordSS, "image/png");
        await this.page.waitForTimeout(1000)
        await this.page.locator(this.resetEmail).click()
        await this.page.waitForTimeout(8000)
        //await page1.bringToFront();
        const context = this.page.context();
        const page1 = await context.newPage();
        await page1.goto(yopmailUrl);
        await page1.locator(this.enterEmail).clear()
        await page1.locator(this.enterEmail).fill(email, { timeout: 90000 })
        await page1.locator(this.checkInbox).click()
        const frame = await page1.frameLocator(this.IframeYopmail)
        if (!frame) throw new Error('Iframe not found')
        //await frame.locator(this.ClickHere).click()
        await this.page.waitForTimeout(10000)
        const [newPage] = await Promise.all
            ([
                this.page.context().waitForEvent('page'),
                await frame.locator(this.clickHere).click()
            ]);
        await newPage.waitForLoadState('load');
        await newPage.locator(this.memberEnterEmail).fill(email, { timeout: 90000 })
        await this.page.waitForTimeout(5000)
        await newPage.locator(this.password).fill(testData.password)
        await newPage.locator(this.confirmPassword).fill(testData.password)
        await newPage.locator(this.resetPassword).click()
        await this.page.waitForTimeout(10000)
        await newPage.close();
        await this.page.waitForTimeout(2000)
        await page1.close();
        await this.page.waitForTimeout(2000)
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        //await this.page.bringToFront();
        await this.page.locator(this.loginbutton).click()
        await this.page.waitForTimeout(8000)
    }

    async confirmEmail() {
        const context = this.page.context();
        const page1 = await context.newPage();
        await page1.goto(yopmailUrl);
        await page1.locator(this.enterEmail).fill(email, { timeout: 90000 })
        await page1.locator(this.checkInbox).click()
        const frame = await page1.frameLocator(this.IframeYopmail)
        const yopmailSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Yopmail Inbox", yopmailSS, "image/png");
        if (!frame) throw new Error('Iframe not found')
        await frame.locator(this.clickHere).click()

        const [newPage] = await Promise.all
            ([
                this.page.context().waitForEvent('page'),
            ]);
        await newPage.waitForLoadState('load');
        await this.page.waitForTimeout(8000)
        await newPage.close();
        await this.page.waitForTimeout(4000)
        await page1.close();
        //await this.page.bringToFront();
    }

    async loginIn() {
        await this.page.waitForTimeout(2000)
        //await this.page.setViewportSize({ width: 1920, height: 1080 });
        const pleaseLoginSS = await this.page.screenshot({ fullPage: true });
        await allure.attachment("Please Login Screen", pleaseLoginSS, "image/png");
        await this.page.locator(this.loginhyperlink).click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.loginbutton).click()
        await this.page.waitForTimeout(5000)
    }
}