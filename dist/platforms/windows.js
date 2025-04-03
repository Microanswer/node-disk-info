"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Windows = void 0;
var constants_1 = require("../utils/constants");
var drive_1 = __importDefault(require("../classes/drive"));
var utils_1 = require("../utils/utils");
var iconv_lite_1 = __importDefault(require("iconv-lite"));
/**
 * Class with Windows specific logic to get disk info.
 */
var Windows = /** @class */ (function () {
    function Windows() {
    }
    Windows.parseCommandResponse = function (str) {
        var drives = [];
        var diskInfoArr = JSON.parse(str);
        for (var i = 0; i < diskInfoArr.value.length; i++) {
            var diskinfo = diskInfoArr.value[i];
            var size = diskinfo.Used + diskinfo.Free;
            drives.push(new drive_1.default("LocalDriver", size, diskinfo.Used, diskinfo.Free, Math.round((diskinfo.Used / size) * 100) + '%', diskinfo.Name + ":"));
        }
        return drives;
    };
    /**
     * Execute specific Windows command to get disk info.
     *
     * @return {Drive[]} List of drives and their info.
     */
    Windows.run = function () {
        var buffer = utils_1.Utils.execute(constants_1.Constants.WINDOWS_COMMAND);
        var cp = utils_1.Utils.chcp();
        var encoding = '';
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
                }
                else {
                    encoding = cp;
                }
        }
        var commandResponse = iconv_lite_1.default.encode(iconv_lite_1.default.decode(buffer, encoding), 'UTF-8').toString();
        return Windows.parseCommandResponse(commandResponse);
    };
    Windows.runAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.Utils.executAsync(constants_1.Constants.WINDOWS_COMMAND)];
                    case 1:
                        commandResponse = _a.sent();
                        return [2 /*return*/, Windows.parseCommandResponse(commandResponse)];
                }
            });
        });
    };
    return Windows;
}());
exports.Windows = Windows;
