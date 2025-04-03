"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
/**
 * Class with constants used in the application.
 */
var Constants = /** @class */ (function () {
    function Constants() {
    }
    /**
     * 不能再用这个命令了，因为 windows 11 把 wmic 工具移除了。
     */
    Constants.WINDOWS_COMMAND_OLD = 'wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list';
    /**
     * Command to execute on Windows.
     */
    Constants.WINDOWS_COMMAND = 'powershell ",@(get-psdrive  -psprovider filesystem | select-object name,used,free) | ConvertTo-Json"';
    /**
     * Command to execute on Linux.
     */
    Constants.LINUX_COMMAND = 'df -P | awk \'NR > 1\'';
    /**
     * Command to execute on OSX.
     */
    Constants.DARWIN_COMMAND = 'df -P | awk \'NR > 1\'';
    return Constants;
}());
exports.Constants = Constants;
