(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Uladzimir_Artsemenka on 7/14/2016.
 */

var body = {
    'fields': {
        'labels': ['Epic']
    }
};

;(function () {
    var JiraVoting = function () {
        function JiraVoting(project, issueTypes, labels) {
            _classCallCheck(this, JiraVoting);

            this._config = {};
            this.setConfig({ project: project, issueTypes: issueTypes, labels: labels });
        }

        _createClass(JiraVoting, [{
            key: 'setConfig',
            value: function setConfig(config) {
                this._config.project = config.project;
                this._config.issueTypes = config.issueTypes;
                this._config.labels = config.labels;
            }
        }, {
            key: 'getIssues',
            value: function getIssues(cb) {
                var config = this._config;
                RequestManager.getRequest('https://epbyminw5131/proxy/jira/rest/api/2/search?jql=project = ' + config.project + ' AND issuetype IN (' + toJqlString(config.issueTypes) + ') AND labels IN (' + toJqlString(config.labels) + ')', null, cb);
            }
        }, {
            key: 'updateIssue',
            value: function updateIssue(issue, body, cb) {
                RequestManager.putRequest('https://epbyminw5131/proxy/jira/rest/api/2/issue/' + issue, body, cb);
            }
        }, {
            key: 'config',
            get: function get() {
                return this._config;
            }
        }]);

        return JiraVoting;
    }();

    var RequestManager = function () {
        function RequestManager() {
            _classCallCheck(this, RequestManager);
        }

        _createClass(RequestManager, null, [{
            key: 'putRequest',
            value: function putRequest(url, data, cb) {
                var headers = {
                    'Content-type': 'application/json; charset=utf-8'
                };
                RequestManager.request('PUT', url, data, headers, cb);
            }
        }, {
            key: 'getRequest',
            value: function getRequest(url, data, cb) {
                RequestManager.request('GET', url, data, null, cb);
            }
        }, {
            key: 'request',
            value: function request(type, url, data, headers, cb) {
                var xhr = new XMLHttpRequest();
                xhr.open(type, url, true);

                if (headers) {
                    Object.keys(headers).forEach(function (key) {
                        xhr.setRequestHeader(key, headers[key]);
                    });
                }
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa('username' + ':' + 'password'));

                xhr.send(data);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;
                    cb(xhr.responseText);
                };
            }
        }]);

        return RequestManager;
    }();

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    window.jiraVoting = new JiraVoting();
})();
},{}]},{},[1])