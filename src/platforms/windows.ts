import {Constants} from '../utils/constants';

import Drive from '../classes/drive';
import {Utils} from "../utils/utils";
import iconv from 'iconv-lite';

/**
 * Class with Windows specific logic to get disk info.
 */
export class Windows {

    private static parseCommandResponse(str: string): Drive[] {
        const drives: Drive[] = [];
        const lines = str.split('\r\r\n');

        let newDiskIteration = false;

        let caption: string = '';
        let description: string = '';
        let freeSpace: number = 0;
        let size: number = 0;

        lines.forEach((value) => {

            if (value !== '') {

                const tokens = value.split('=');
                const section = tokens[0];
                const data = tokens[1];

                switch (section) {
                    case 'Caption':
                        caption = data;
                        newDiskIteration = true;
                        break;
                    case 'Description':
                        description = data;
                        break;
                    case 'FreeSpace':
                        freeSpace = isNaN(parseFloat(data)) ? 0 : +data;
                        break;
                    case 'Size':
                        size = isNaN(parseFloat(data)) ? 0 : +data;
                        break;
                }

            } else {

                if (newDiskIteration) {

                    const used: number = (size - freeSpace);

                    let percent = '0%';

                    if (size > 0) {
                        percent = Math.round((used / size) * 100) + '%';
                    }

                    const d = new Drive(
                        description,
                        size,
                        used,
                        freeSpace,
                        percent,
                        caption);

                    drives.push(d);

                    newDiskIteration = false;
                    caption = '';
                    description = '';
                    freeSpace = 0;
                    size = 0;
                }

            }

        });

        return drives;
    }

    /**
     * Execute specific Windows command to get disk info.
     *
     * @return {Drive[]} List of drives and their info.
     */
    public static run(): Drive[] {

        let buffer = Utils.execute(Constants.WINDOWS_COMMAND);

        const cp = Utils.chcp();
        let encoding = '';
        switch (cp) {
            case '65000': // UTF-7
                encoding = 'UTF-7';
                break;
            case '65001': // UTF-8
                encoding = 'UTF-8';
                break;
            default: // Other Encoding
                if (/^-?[\d.]+(?:e-?\d+)?$/.test(cp)) {
                    encoding = 'cp' + cp;
                } else {
                    encoding = cp;
                }
        }
        let commandResponse = iconv.encode(iconv.decode(buffer, encoding),'UTF-8').toString();


        return Windows.parseCommandResponse(commandResponse);
    }

    public static async runAsync(): Promise<Drive[]> {
        let commandResponse = await Utils.executAsync(Constants.WINDOWS_COMMAND);
        return Windows.parseCommandResponse(commandResponse);
    }

}
