"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var Constants = (function () {
    function Constants() {
    }
    Constants.WINDOWS_COMMAND_OLD = 'wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list';
    Constants.WINDOWS_COMMAND = 'powershell -Command ",@(get-psdrive  -psprovider filesystem | select-object name,used,free) | ConvertTo-Json"';
    Constants.LINUX_COMMAND = 'df -P | awk \'NR > 1\'';
    Constants.DARWIN_COMMAND = 'df -P | awk \'NR > 1\'';
    return Constants;
}());
exports.Constants = Constants;
