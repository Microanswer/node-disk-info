import * as os from 'os';
import {execSync, exec} from "child_process";
import iconv from 'iconv-lite';

/**
 * encoding for Win32
 */
let encoding: string | null = null;

/**
 * Class with utilitary methods.
 */
export class Utils {

    /**
     * Detects current platform.
     *
     * @return {string} Platform: win32, linux, darwin.
     */
    public static detectPlatform(): string {
        return os.platform().toLowerCase();
    }

    /**
     * Get chcp value (only for Win32 platform).
     *
     * @return {string} Platform: win32.
     */
    public static chcp(): string {
        if (!encoding) {
            let cp = execSync('chcp').toString().split(':')[1].trim();
            switch (cp) {
                case '65000': // UTF-7
                    encoding = 'UTF-7';
                    break;
                case '65001': // UTF-8
                    encoding = 'UTF-8';
                    break;
                case '936': // GBK
                    encoding = 'GBK';
                    break;
                default: // Other Encoding
                    if (/^-?[\d.]+(?:e-?\d+)?$/.test(cp)) {
                        encoding = 'cp' + cp;
                    } else {
                        encoding = cp;
                    }
            }
        }

        return encoding;
    }

    /**
     * Executes a command in SO console.
     *
     * @param command command: Command to execute.
     */
    public static execute(command: string): Buffer {
        return execSync(command, {windowsHide: true, encoding: 'buffer'});
    }

    /**
     * Executes a command in SO console.
     *
     * @param command command: Command to execute.
     */
    public static async executAsync(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, {encoding: "buffer"}, (err, stdout, stderr) => {
                let encoding = Utils.chcp()
                if (err) {
                    if (err.code !== 0) {
                        // exit code !== 0 → 子进程执行失败
                        if (stderr != null && stderr.length > 0) {
                            reject(new Error(iconv.decode(stderr, encoding).trim()))
                        } else {
                            reject(err);
                        }
                    } else {
                        // Node/spawn error → 真正的错误
                        reject(err);
                    }
                    return;
                }

                resolve(iconv.decode(stdout, encoding));
            });
        });
    }
}
