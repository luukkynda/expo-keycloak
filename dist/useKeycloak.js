import { useContext, useMemo } from 'react';
import { KeycloakContext } from './KeycloakContext';
export var useKeycloak = function () {
    var _a = useContext(KeycloakContext), _b = _a.isLoggedIn, isLoggedIn = _b === void 0 ? false : _b, login = _a.login, logout = _a.logout, _c = _a.ready, ready = _c === void 0 ? false : _c, _d = _a.tokens, tokens = _d === void 0 ? {} : _d;
    return useMemo(function () {
        var _a;
        return ({
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            ready: ready,
            token: (_a = tokens === null || tokens === void 0 ? void 0 : tokens.accessToken) !== null && _a !== void 0 ? _a : null,
        });
    }, [ready, tokens]);
};
