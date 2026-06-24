import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "tests/datasource/data/.env") });

async function globalSetup() {

    // Read environment from .env
    const environment = process.env.ENVIRONMENT;
    const tester = process.env.TESTER;

    // Read environment URLs from CSV
    const envData = parse(fs.readFileSync(path.resolve(__dirname, "tests/datasource/consignmentSetUp/envsetup.csv")), {
        columns: true,
        skip_empty_lines: true
    });

    const envRecord = envData.find(
        item => item.environment.toLowerCase() === environment
    );

    const baseUrl = envRecord ? envRecord.url : 'Not Found';

    const allureResultsDir = path.join(__dirname, 'allure-results');
    const allureReportDir = path.join(__dirname, 'allure-report');

    if (!existsSync(allureResultsDir)) {
        mkdirSync(allureResultsDir);
    }

    // Copy previous history
    const historySrc = path.join(allureReportDir, 'history');
    const historyDest = path.join(allureResultsDir, 'history');

    if (existsSync(historySrc)) {
        copySync(historySrc, historyDest, { overwrite: true });
    }

    // Environment Information
    writeFileSync(
        path.join(allureResultsDir, 'environment.properties'),
        `Environment=${environment.toUpperCase()}
        Application=${baseUrl}`
    );

    // Executor Information
    const executor = {
        name: tester,
        type: 'Playwright',
        buildName: 'E2E_Scenario_Based_UI_AUTOMATION',
        buildUrl: baseUrl
    };

    writeFileSync(
        path.join(allureResultsDir, 'executor.json'),
        JSON.stringify(executor, null, 2)
    );

    console.log('====================================');
    console.log(`Environment : ${environment.toUpperCase()}`);
    console.log(`Base URL    : ${baseUrl}`);
    console.log('====================================');
}

export default globalSetup;