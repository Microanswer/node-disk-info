export default class Drive {
    private readonly _filesystem;
    private readonly _blocks;
    private readonly _used;
    private readonly _available;
    private readonly _capacity;
    private readonly _mounted;
    constructor(filesystem: string, blocks: number, used: number, available: number, capacity: string, mounted: string);
    get filesystem(): string;
    get blocks(): number;
    get used(): number;
    get available(): number;
    get capacity(): string;
    get mounted(): string;
}
