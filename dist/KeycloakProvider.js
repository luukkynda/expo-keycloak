var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { TokenResponse, useAuthRequest, useAutoDiscovery, } from 'expo-auth-session';
import { getRealmURL } from './getRealmURL';
import { KeycloakContext } from './KeycloakContext';
import useAsyncStorage from './useAsyncStorage';
import { handleTokenExchange } from './handleTokenExchange';
import { NATIVE_REDIRECT_PATH, REFRESH_TIME_BUFFER, TOKEN_STORAGE_KEY, } from './const';
export var KeycloakProvider = function (props) {
    var _a, _b, _c, _d, _e;
    var discovery = useAutoDiscovery(getRealmURL(props));
    var redirectUri = AuthSession.makeRedirectUri({
        native: ((_a = props.scheme) !== null && _a !== void 0 ? _a : 'exp') + "://" + ((_b = props.nativeRedirectPath) !== null && _b !== void 0 ? _b : NATIVE_REDIRECT_PATH)
    });
    if (!!props.scheme) {
        redirectUri = AuthSession.makeRedirectUri({
            native: ((_c = props.scheme) !== null && _c !== void 0 ? _c : 'exp') + "://" + ((_d = props.nativeRedirectPath) !== null && _d !== void 0 ? _d : NATIVE_REDIRECT_PATH),
            scheme: props.scheme
        });
    }
    var _f = useAsyncStorage((_e = props.tokenStorageKey) !== null && _e !== void 0 ? _e : TOKEN_STORAGE_KEY, null), savedTokens = _f[0], saveTokens = _f[1], hydrated = _f[2];
    var config = __assign({ redirectUri: redirectUri }, props);
    var _g = useAuthRequest(__assign({ usePKCE: false }, config), discovery), request = _g[0], response = _g[1], promptAsync = _g[2];
    var _h = useState(null), refreshHandle = _h[0], setRefreshHandle = _h[1];
    var updateState = useCallback(function (callbackValue) {
        var _a;
        var tokens = callbackValue !== null && callbackValue !== void 0 ? callbackValue : null;
        if (!!tokens) {
            saveTokens(tokens);
            if (!props.disableAutoRefresh &&
                !!tokens.expiresIn) {
                clearTimeout(refreshHandle);
                setRefreshHandle(setTimeout(function () { return refreshCallBackRef.current(); }, (tokens.expiresIn -
                    ((_a = props.refreshTimeBuffer) !== null && _a !== void 0 ? _a : REFRESH_TIME_BUFFER)) *
                    1000));
            }
        }
        else {
            saveTokens(null);
            clearTimeout(refreshHandle);
            setRefreshHandle(null);
        }
    }, [saveTokens, refreshHandle, setRefreshHandle]);
    var handleTokenRefresh = useCallback(function () {
        if (!hydrated)
            return;
        if (!savedTokens && hydrated) {
            updateState(null);
            return;
        }
        if (TokenResponse.isTokenFresh(savedTokens)) {
            updateState({ tokens: savedTokens });
        }
        if (!discovery)
            throw new Error('KC Not Initialized. - Discovery not ready.');
        AuthSession.refreshAsync(__assign({ refreshToken: savedTokens.refreshToken }, config), discovery)
            .catch(updateState)
            .then(updateState);
    }, [discovery, hydrated, savedTokens, updateState]);
    var handleLogin = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            clearTimeout(refreshHandle);
            return [2 /*return*/, promptAsync()];
        });
    }); }, [promptAsync, refreshHandle]);
    var handleLogout = useCallback(function (everywhere) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!savedTokens)
                throw new Error('Not logged in.');
            if (everywhere) {
                AuthSession.revokeAsync(__assign({ token: savedTokens === null || savedTokens === void 0 ? void 0 : savedTokens.accessToken }, config), discovery).catch(function (e) { return console.error(e); });
                saveTokens(null);
            }
            else {
                AuthSession.dismiss();
                saveTokens(null);
            }
            return [2 /*return*/];
        });
    }); }, [discovery, savedTokens]);
    var refreshCallBackRef = useRef(handleTokenRefresh);
    useEffect(function () {
        refreshCallBackRef.current = handleTokenRefresh;
    }, [savedTokens]);
    useEffect(function () {
        if (hydrated)
            refreshCallBackRef.current();
    }, [hydrated]);
    useEffect(function () {
        handleTokenExchange({ response: response, discovery: discovery, config: config })
            .then(function (res) {
            if (res !== null)
                updateState(res.tokens);
        });
    }, [response]);
    return (React.createElement(KeycloakContext.Provider, { value: {
            isLoggedIn: !props.disableAutoRefresh && !!savedTokens,
            login: handleLogin,
            logout: handleLogout,
            ready: request !== null,
            tokens: savedTokens,
        } }, props.children));
};
