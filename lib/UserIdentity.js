var autodafe = require('../../autodafe');

/**
 * @class UserIdentity
 * @extends AtdClass
 */
var UserIdentity = module.exports = autodafe.AtdClass.extend(/**@lends UserIdentity*/{
    /**
     * @protected
     */
    _props: function () {
        this._super();

        this._data = {};
    },

    /**
     * @constructs
     * @private
     */
    _init: function () {
        this._super();

        for (var prop in this._options) {
            if (this._options.hasOwnProperty(prop)) {
                this.set(prop, this._options[prop]);
            }
        }
    },

    isGuest: function () {
        return this.get('id') === null;
    },

    set: function (name, value) {
        this._data[name] = value;
    },

    get: function (name) {
        return this._data[name] || null;
    }
});
