import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { createRequire } from "module";

// Create require for CommonJS modules
const require = createRequire(import.meta.url);

// Load env variables
dotenv.config();

// Fix __dirname issue in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const reportFolder = path.join(__dirname, "allure-report");
const zipFilePath = path.join(__dirname, "allure-report.zip");

// ✅ Step 1: Zip the Allure report folder
const zipReport = async (archiverModule) => {
    return new Promise((resolve, reject) => {
        // Check if report folder exists
        if (!fs.existsSync(reportFolder)) {
            return reject(new Error(`Report folder not found: ${reportFolder}`));
        }

        const output = fs.createWriteStream(zipFilePath);
        const archive = archiverModule("zip", { zlib: { level: 9 } });

        output.on("close", () => {
            console.log(`✅ Zip created: ${archive.pointer()} bytes`);
            resolve();
        });

        output.on("error", (err) => reject(err));
        archive.on("error", (err) => reject(err));

        archive.pipe(output);
        archive.directory(reportFolder, false);
        archive.finalize();
    });
};

// ✅ Step 2: Send email
const sendEmail = async (nodemailer) => {
    // Check if all required SMTP credentials exist
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMAIL_RECEIVER) {
        console.warn("⚠️  SMTP credentials not configured. Skipping email.");
        console.warn("    Create .env file with: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_RECEIVER");
        return;
    }

    try {
        // Determine secure connection based on port (465 = secure, 587 = TLS)
        const port = Number(process.env.SMTP_PORT);
        const secure = port === 465;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: port,
            secure: secure, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Playwright Allure Report - ${new Date().toLocaleString()}`,
            text: "Please find attached the Allure report.",
            attachments: [
                {
                    filename: "allure-report.zip",
                    path: zipFilePath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("⚠️  Email failed:", error.message);
        console.error("    Report ZIP created successfully at:", zipFilePath);
    }
};

// ✅ Run both steps
(async () => {
    try {
        // Load CommonJS modules using require
        const archiver = require("archiver");
        const nodemailer = require("nodemailer");

        console.log("📦 Zipping Allure report...");
        await zipReport(archiver);

        console.log("📧 Attempting to send email...");
        await sendEmail(nodemailer);

        console.log("✅ Done!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error.message);
        process.exit(1);
    } finally {
        // Clean up zip file regardless of success/failure
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
        }
    }
})();