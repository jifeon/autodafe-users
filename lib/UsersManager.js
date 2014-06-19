var autodafe = require('../../autodafe'),
    UserIdentity = require('./UserIdentity'),
    RolesSet = require('./RolesSet'),
    Authorizer = require('./Authorizer'),
    vow = require('vow'),
    shortId = require('shortid');

/**
 * @class UsersManager
 * @extends Component
 */
var UsersManager = module.exports = autodafe.Component.extend(/**@lends UsersManager*/{
    /**
     * @protected
     * @type {string}
     */
    _name: 'users',

    /**
     * @protected
     */
    _props: function () {
        this._super();

        /**
         * @type {RolesSet}
         * @private
         */
        this._rights = null;
        this._users = {};
        this._authorizers = {
            standard: new Authorizer
        };
    },

    /**
     * @constructs
     * @private
     */
    _init: function () {
        this._super();

        this._initRoles();
    },

    _initRoles: function () {
        this._rights = new RolesSet;
    },

    processRequest: function (request) {
        return this._getAuthorizer(request).retrieveUserId(request).then(function (id) {
            var userIdentity = this._users[id] || new UserIdentity({id: null});
            request.setData('user', userIdentity);
        }, this);
    },

    checkRight: function (userIdentity, action) {
        return this._rights.checkRight(userIdentity, action);
    },

    getRoles: function (userIdentity) {
        return this._rights.getRoles(userIdentity);
    },

    login: function (request) {
        var userIdentity = request.getData('user'),
            id = shortId.generate();
        if (userIdentity) {
            userIdentity.set('id', id);
        } else {
            userIdentity = new UserIdentity({id: id});
            request.setData('user', userIdentity);
        }

        this._users[id] = userIdentity;
        setTimeout(function () {
            delete this._users[id];
        }.bind(this), 30 * 60000);
        return this._getAuthorizer(request).setUserId(request, id);
    },

    logout: function (request) {
        var userIdentity = request.getData('user');
        if (userIdentity) {
            var id = userIdentity.get('id');
            userIdentity.set('id', null);
            delete this._users[id];
        }
        return this._getAuthorizer(request).unsetUserId(request, id);
    },

    addAuthorizer: function (type, authorizer) {
        this._authorizers[type] = authorizer;
    },

    _getAuthorizer: function (request) {
        return this._authorizers[request.getType()] || this._authorizers.standard;
    }
});
