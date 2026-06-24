import nodemailer from "nodemailer";
import archiver from "archiver";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// SMTP Configuration

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL_ID,
        pass: process.env.SMTP_PASSWD,
    },
});

// Create Zip File

async function zipReport(sourcePath, zipPath) {
    const output = fs.createWriteStream(zipPath);

    const archive = archiver("zip", {
        zlib: { level: 9 },
    });

    return new Promise((resolve, reject) => {

        output.on("close", () => {
            console.log(`ZIP Created: ${zipPath}`);
            resolve();
        });

        archive.on("error", (err) => reject(err));

        archive.pipe(output);

        if (fs.lstatSync(sourcePath).isDirectory()) {
            archive.directory(sourcePath, false);
        } else {
            archive.file(sourcePath, {
                name: path.basename(sourcePath),
            });
        }

        archive.finalize();
    });
}

// Send Email

async function sendMail(recipients, subject, body, attachmentPath) {

    const mailOptions = {
        from: process.env.SMTP_EMAIL_ID,
        to: Array.isArray(recipients)
            ? recipients.join(",")
            : recipients,
        subject,
        text: body,
        attachments: [
            {
                filename: path.basename(attachmentPath),
                path: attachmentPath,
            },
        ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");
}

// Main Function

export async function sendAutomationReport(
    recipients,
    environment = "UAT"
) {
    try {

        const reportPath = path.resolve(
            "./playwright-report/index.html"
        );

        const zipPath = path.resolve(
            `./playwright-report-${environment}.zip`
        );

        await zipReport(reportPath, zipPath);

        await sendMail(
            recipients,
            `Playwright Automation Report - ${environment}`,
            `Please find attached automation report for ${environment}.`,
            zipPath
        );

    } catch (error) {
        console.error("Failed to send report:", error);
    }
}