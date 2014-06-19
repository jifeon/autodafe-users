var autodafe = require('../../autodafe'),
    vow = require('vow');

/**
 * @class Authorizer
 * @extends AtdClass
 */
var Authorizer = module.exports = autodafe.AtdClass.extend(/**@lends Authorizer#*/{
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
        return vow.fulfill(request.getData('id'));
    },

    setUserId: function (request, id) {
        request.setData('id', id);
        return vow.fulfill(true);
    },

    unsetUserId: function (request, id) {
        request.setData('id', null);
        return vow.fulfill(true);
    }
});
