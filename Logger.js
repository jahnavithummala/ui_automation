// import fs from 'fs';
// import path from 'path';
// import chalk from 'chalk';
// import stripAnsi from 'strip-ansi';

// export default class Logger {
//     constructor(testName) {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const logsDir = path.resolve('logs');
//         if (!fs.existsSync(logsDir)) {
//             fs.mkdirSync(logsDir);
//         }
//         this.logFile = path.join(logsDir, `execution-${testName}-${timestamp}.log`);
//     }

//     logStep(message) {
//         const entry = `[${new Date().toISOString()}] STEP: ${message}\n`;
//         fs.appendFileSync(this.logFile, entry);
//         console.log(chalk.white(entry.trim())); // styled console output
//     }

//     logInfo(message) {
//         const entry = `[${new Date().toISOString()}] INFO: ${message}\n`;
//         fs.appendFileSync(this.logFile, entry);
//         console.log(chalk.green(entry.trim()));
//     }

//     logError(message) {
//         const entry = `[${new Date().toISOString()}] ERROR: ${message}\n`;
//         fs.appendFileSync(this.logFile, entry);
//         console.error(chalk.red.bold(entry.trim()));
//     }
// }

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

export default class Logger {
    constructor(testName) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const logsDir = path.resolve('logs');
        if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
        this.logFile = path.join(logsDir, `execution-${testName}-${timestamp}.log`);
    }

    _write(level, message, colorFn = (s) => s) {
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] ${level}: ${message}`;
        // Write plain text to file (strip any ANSI just in case)
        fs.appendFileSync(this.logFile, stripAnsi(entry) + '\n');
        // Styled console output
        console.log(colorFn(entry));
    }

    logStep(message) {
        this._write('STEP', message, (s) => chalk.white(s));
    }

    logInfo(message) {
        this._write('INFO', message, (s) => chalk.green(s));
    }

    logError(message) {
        this._write('ERROR', message, (s) => chalk.red.bold(s));
    }
}