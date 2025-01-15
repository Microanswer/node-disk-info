import Drive from './classes/drive';
import {Darwin} from './platforms/darwin';
import {Linux} from './platforms/linux';
import {Windows} from './platforms/windows';
import {Utils} from './utils/utils';

/**
 * Get disk info according current platform.
 *
 * @author Cristiam Mercado
 * @return {Promise<Drive[]>} Promise resolves array of disks and their info.
 */
export async function getDiskInfo(): Promise<Drive[]> {
    const platform = Utils.detectPlatform();
    let drivesInfo: Drive[];

    switch (platform) {
        case 'aix': // IBM AIX platform
            throw new Error(`Platform not supported: ${platform}`);
        case 'android': // Android platform
            throw new Error(`Platform not supported: ${platform}`);
        case 'darwin': // Darwin platfrom(MacOS, IOS etc)
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'freebsd': // FreeBSD Platform
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'linux': // Linux Platform
            drivesInfo = Linux.run();
            return drivesInfo;
        case 'openbsd': // OpenBSD platform
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'sunos': // SunOS platform
            throw new Error(`Platform not supported: ${platform}`);
        case 'win32': // windows platform
            drivesInfo = await Windows.runAsync();
            return drivesInfo;
        default: // unknown platform
            throw new Error(`Platform not recognized: ${platform}`);
    }

}

/**
 * Get disk info according current platform in an syncronous way.
 *
 * @author Cristiam Mercado
 * @return {Drive[]} Array of disks and their info.
 * @throws {Error} Current platform must be win32, linux or darwin.
 */
export function getDiskInfoSync(): Drive[] {

    const platform = Utils.detectPlatform();
    let drivesInfo: Drive[];

    switch (platform) {
        case 'aix': // IBM AIX platform
            throw new Error("Platform not supported: " + platform);
        case 'android': // Android platform
            throw new Error("Platform not supported: " + platform);
        case 'darwin': // Darwin platfrom(MacOS, IOS etc)
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'freebsd': // FreeBSD Platform
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'linux': // Linux Platform
            drivesInfo = Linux.run();
            return drivesInfo;
        case 'openbsd': // OpenBSD platform
            drivesInfo = Darwin.run();
            return drivesInfo;
        case 'sunos': // SunOS platform
            throw new Error("Platform not supported: " + platform);
        case 'win32': // windows platform
            drivesInfo = Windows.run();
            return drivesInfo;
        default: // unknown platform
            throw new Error("Platform not recognized: " + platform);
    }

}
