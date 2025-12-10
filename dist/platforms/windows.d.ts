import Drive from '../classes/drive';
export declare class Windows {
    private static parseCommandResponse;
    static run(): Drive[];
    static runAsync(): Promise<Drive[]>;
}
