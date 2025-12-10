/// <reference types="node" />
export declare class Utils {
    static detectPlatform(): string;
    static chcp(): string;
    static execute(command: string): Buffer;
    static executAsync(command: string): Promise<string>;
}
