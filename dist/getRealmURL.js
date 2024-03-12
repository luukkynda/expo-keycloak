export var getRealmURL = function (config) {
    var url = config.url, realm = config.realm;
    var slash = url.endsWith('/') ? '' : '/';
    return url + slash + "realms/" + encodeURIComponent(realm);
};
