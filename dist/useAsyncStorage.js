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
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
var useAsyncStorage = function (key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var _a = useState({
        hydrated: false,
        storageValue: defaultValue,
    }), state = _a[0], setState = _a[1];
    var hydrated = state.hydrated, storageValue = state.storageValue;
    function pullFromStorage() {
        return __awaiter(this, void 0, void 0, function () {
            var fromStorage, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.getItem(key)];
                    case 1:
                        fromStorage = _a.sent();
                        value = defaultValue;
                        if (fromStorage) {
                            value = JSON.parse(fromStorage);
                        }
                        setState({ hydrated: true, storageValue: value });
                        return [2 /*return*/];
                }
            });
        });
    }
    function updateStorage(newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var stringifiedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setState({ hydrated: true, storageValue: newValue });
                        stringifiedValue = JSON.stringify(newValue);
                        return [4 /*yield*/, AsyncStorage.setItem(key, stringifiedValue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    useEffect(function () {
        pullFromStorage();
    }, []);
    return [storageValue, updateStorage, hydrated];
};
export default useAsyncStorage;
