/**
 * Class with constants used in the application.
 */
export declare class Constants {
    /**
     * 不能再用这个命令了，因为 windows 11 把 wmic 工具移除了。
     */
    static readonly WINDOWS_COMMAND_OLD: string;
    /**
     * Command to execute on Windows.
     */
    static readonly WINDOWS_COMMAND: string;
    /**
     * Command to execute on Linux.
     */
    static readonly LINUX_COMMAND: string;
    /**
     * Command to execute on OSX.
     */
    static readonly DARWIN_COMMAND: string;
}
