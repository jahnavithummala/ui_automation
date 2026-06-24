import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "tests/datasource/data/.env") });

async function generateBJEmail(environment) {
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

async function getEnvUrl() {
  //const env = fs.readFileSync(path.resolve(__dirname, "tests/datasource/data/.env"), "utf-8").trim().toLowerCase();
  const environment = process.env.ENVIRONMENT;

  const envData = parse(fs.readFileSync(path.resolve(__dirname, "tests/datasource/consignmentSetUp/envsetup.csv")), {
    columns: true,
    skip_empty_lines: true
  });

  const envRecord = envData.find(
    item => item.environment.toLowerCase() === environment
  );

  return envRecord ? envRecord.url : null;
}

export { generateBJEmail, getEnvUrl };