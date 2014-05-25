var autodafe = require('../../../autodafe'),
    HttpAuthorizer = require('./HttpAuthorizer');

/**
 * @class UsersHttpInjection
 * @extends Injection
 */
var UsersHttpInjection = module.exports = autodafe.Injection.extend(/**@lends UsersHttpInjection#*/{
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

    inject: function () {
        this._app.get('users').addAuthorizer('http', new HttpAuthorizer);
        return this._super();
    }
});
