/**
 * Class with constants used in the application.
 */
export class Constants {

    /**
     * 不能再用这个命令了，因为 windows 11 把 wmic 工具移除了。
     */
    public static readonly WINDOWS_COMMAND_OLD: string = 'wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list';

    /**
     * Command to execute on Windows.
     */
    public static readonly WINDOWS_COMMAND: string = 'powershell -Command ",@(get-psdrive  -psprovider filesystem | select-object name,used,free) | ConvertTo-Json"';

    /**
     * Command to execute on Linux.
     */
    public static readonly LINUX_COMMAND: string = 'df -P | awk \'NR > 1\'';

    /**
     * Command to execute on OSX.
     */
    public static readonly DARWIN_COMMAND: string = 'df -P | awk \'NR > 1\'';

}
