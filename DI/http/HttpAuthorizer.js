var Authorizer = require('../../lib/Authorizer'),
    vow = require('vow');

/**
 * @class HttpAuthorizer
 * @extends Authorizer
 */
var HttpAuthorizer = module.exports = Authorizer.extend(/**@lends HttpAuthorizer#*/{
    /**
     * @protected
     */
    _props: function () {
        this._super();


    },

    /**
     * @constructs
     * @private
     */
    _init: function () {
        this._super();


    },

    retrieveUserId: function (request) {
        return vow.fulfill(request.getCookie('autodafe-users-id'));
    },

    setUserId: function (request, id) {
        request.setCookie('autodafe-users-id', id);
        return vow.fulfill(true);
    },

    unsetUserId: function (request) {
        request.removeCookie('autodafe-users-id');
        return vow.fulfill(true);
    }
});
