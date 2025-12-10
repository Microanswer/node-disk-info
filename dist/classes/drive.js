"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Drive = (function () {
    function Drive(filesystem, blocks, used, available, capacity, mounted) {
        this._filesystem = filesystem;
        this._blocks = blocks;
        this._used = used;
        this._available = available;
        this._capacity = capacity;
        this._mounted = mounted;
    }
    Object.defineProperty(Drive.prototype, "filesystem", {
        get: function () {
            return this._filesystem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "blocks", {
        get: function () {
            return this._blocks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "used", {
        get: function () {
            return this._used;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "available", {
        get: function () {
            return this._available;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "mounted", {
        get: function () {
            return this._mounted;
        },
        enumerable: false,
        configurable: true
    });
    return Drive;
}());
exports.default = Drive;
