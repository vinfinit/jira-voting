'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = function (UserVoting) {
    if (!UserVoting) {
        throw new Error('Module UserVoting not found!');
    }

    var userVoting = void 0;

    var JiraVoting = function () {
        function JiraVoting(title) {
            _classCallCheck(this, JiraVoting);

            userVoting = new UserVoting(title);
            this.config = {};
        }

        _createClass(JiraVoting, [{
            key: 'setConfig',
            value: function setConfig(config) {
                this.config.proxyPass = config.proxyPass;
                this.config.project = config.project;
                this.config.issueTypes = config.issueTypes;
                this.config.labels = config.labels;

                this.config.authorization = {
                    userName: config.userName,
                    password: config.password
                };
            }
        }, {
            key: 'init',
            value: function init(column, body) {
                var _this = this;

                this.clear();
                this.getIssues(function (data) {
                    var issues = JSON.parse(data).issues;

                    var _loop = function _loop(i) {
                        _this.pushIssue(issues[i], function () {
                            return _this.updateIssue(issues[i], body, function () {
                                return _this.init(column, body);
                            });
                        });
                    };

                    for (var i = 0; i < column; i++) {
                        _loop(i);
                    }
                });
            }
        }, {
            key: 'getIssues',
            value: function getIssues(cb) {
                var config = this.config;
                _requestManager2.default.getRequest(config.proxyPass + 'rest/api/2/search?' + JqlStringBuilder.url(config), null, { 'Authorization': 'Basic ' + btoa(config.authorization.userName + ':' + config.authorization.password) }, cb);
            }
        }, {
            key: 'pushIssue',
            value: function pushIssue(issue, cb) {
                userVoting.pushSection(issue.key, issue.fields.issuetype.description, cb);
                return this;
            }
        }, {
            key: 'updateIssue',
            value: function updateIssue(issue, body, cb) {
                _requestManager2.default.putRequest(this.config.proxyPass + 'rest/api/2/issue/' + issue.key, body, cb);
                return this;
            }
        }, {
            key: 'clear',
            value: function clear() {
                userVoting.clear();
                return this;
            }
        }]);

        return JiraVoting;
    }();

    var JqlStringBuilder = function () {
        function JqlStringBuilder() {
            _classCallCheck(this, JqlStringBuilder);
        }

        _createClass(JqlStringBuilder, null, [{
            key: 'url',
            value: function url(config) {
                var jqlString = 'jql=project = ' + config.project;
                if (config.issueTypes) {
                    jqlString += ' AND issuetype IN (' + JqlStringBuilder.create(config.issueTypes) + ')';
                }
                if (config.labels) {
                    jqlString += ' AND labels IN (' + JqlStringBuilder.create(config.labels) + ')';
                }
                return jqlString;
            }
        }, {
            key: 'create',
            value: function create(item) {
                return Array.isArray(item) ? item.join(',') : item;
            }
        }]);

        return JqlStringBuilder;
    }();

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module('api.jira');
};

var _requestManager = require('../modules/requestManager');

var _requestManager2 = _interopRequireDefault(_requestManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }