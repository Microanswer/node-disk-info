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

        const diskInfoArr: {
            value: {Name:string,Used: number, Free: number}[],
            Count: number,
        } = JSON.parse(str);

        for (let i = 0; i < diskInfoArr.value.length; i++) {
            let diskinfo = diskInfoArr.value[i];
            let size = diskinfo.Used + diskinfo.Free;
            drives.push(new Drive(
                "LocalDriver",
                size,
                diskinfo.Used,
                diskinfo.Free,
                Math.round((diskinfo.Used / size) * 100) + '%',
                diskinfo.Name + ":"
            ))

        }

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
