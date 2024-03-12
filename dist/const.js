export var KC_INITIAL_VALUE = {
    ready: false,
    isLoggedIn: false,
    login: function () { return console.error('KC Not Initialized.'); },
    logout: function () { return console.error('Not Logged In.'); },
    tokens: null,
};
export var NATIVE_REDIRECT_PATH = 'auth/redirect';
export var TOKEN_STORAGE_KEY = '$KEYCLOAK_AUTH_TOKEN$';
export var REFRESH_TIME_BUFFER = 10;
