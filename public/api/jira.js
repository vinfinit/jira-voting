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

    var userVoting = new UserVoting();

    var JiraVoting = function () {
        function JiraVoting() {
            _classCallCheck(this, JiraVoting);

            this.config = {};
        }

        _createClass(JiraVoting, [{
            key: 'setConfig',
            value: function setConfig(config) {
                this.config.proxyPass = config.proxyPass;
                this.config.project = config.project;
                this.config.issueTypes = config.issueTypes;
                this.config.labels = config.labels;
            }
        }, {
            key: 'getIssues',
            value: function getIssues(cb) {
                var config = this.config;
                // AND labels IN (${toJqlString(config.labels)})
                _requestManager2.default.getRequest(this.config.proxyPass + 'rest/api/2/search?jql=project = ' + config.project + ' AND issuetype IN (' + toJqlString(config.issueTypes) + ')&maxResults=10', null, cb);
            }
        }, {
            key: 'pushIssue',
            value: function pushIssue(issue) {
                userVoting.pushSection(issue.key, issue.fields.issuetype.description, function () {
                    return console.log('hello');
                });
            }
        }, {
            key: 'updateIssue',
            value: function updateIssue(issue, body, cb) {
                _requestManager2.default.putRequest(this.config.proxyPass + 'rest/api/2/issue/' + issue, body, cb);
            }
        }]);

        return JiraVoting;
    }();

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module('api.jira');
};

var _requestManager = require('../modules/requestManager');

var _requestManager2 = _interopRequireDefault(_requestManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }