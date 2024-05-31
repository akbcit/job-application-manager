import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const extractInfoFromEmailPython = (emails) => {
    const emailContent = emails.map(email => email.messageContent);
    const emailsJson = JSON.stringify(emailContent);

    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "./extract_job_links.py");

        // Write JSON data to a temporary file
        const tempFilePath = path.join(os.tmpdir(), `emails.json_${uuidv4()}`);
        fs.writeFileSync(tempFilePath, emailsJson);

        // Determine the Python executable based on the platform
        const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';

        const childProcess = spawn(pythonExecutable, [scriptPath, tempFilePath]);

        let stdoutData = '';
        let stderrData = '';

        childProcess.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        childProcess.on('close', (code) => {
            fs.unlinkSync(tempFilePath); // Clean up the temporary file
            console.log("STDOUT:", stdoutData); // Log the output
            console.error("STDERR:", stderrData); // Log the error output

            if (code !== 0) {
                console.error(`Process exited with code: ${code}`);
                reject(new Error(`Process exited with code: ${code}`));
            } else if (stderrData) {
                reject(new Error(stderrData));
            } else {
                try {
                    const linksArray = JSON.parse(stdoutData).map(item => item.Link);
                    resolve(linksArray);
                } catch (error) {
                    reject(new Error(`Failed to parse output: ${error.message}`));
                }
            }
        });
    });
};
