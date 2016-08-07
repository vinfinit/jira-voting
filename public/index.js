/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _votingDom = __webpack_require__(1);

	var _votingDom2 = _interopRequireDefault(_votingDom);

	var _requestManager = __webpack_require__(2);

	var _requestManager2 = _interopRequireDefault(_requestManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var body = {
	    'fields': {
	        'labels': ['Epic']
	    }
	};

	;(function (window) {
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
	                _requestManager2.default.getRequest('https://localhost:8080/proxy/jira/rest/api/2/search?jql=project = ' + config.project + ' AND issuetype IN (' + toJqlString(config.issueTypes) + ') AND labels IN (' + toJqlString(config.labels) + ')&maxResults=10', null, cb);
	            }
	        }, {
	            key: 'updateIssue',
	            value: function updateIssue(issue, body, cb) {
	                _requestManager2.default.putRequest('https://localhost:8080/proxy/jira/rest/api/2/issue/' + issue, body, cb);
	            }
	        }, {
	            key: 'config',
	            get: function get() {
	                return this._config;
	            }
	        }]);

	        return JiraVoting;
	    }();

	    function toJqlString(item) {
	        return Array.isArray(item) ? item.join(',') : item;
	    }

	    window.jiraVoting = new JiraVoting();
	})(window);

	var config = {
	    project: "EPMDHMPERF",
	    issueTypes: "Story",
	    labels: 'wow'
	};

	jiraVoting.setConfig(config);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by vinfinit on 8/7/16.
	 */

	exports.default = function (document) {

	    var votingList = [],
	        votingContent = document.createElement('section');

	    return function () {
	        function VotingContainer(label) {
	            _classCallCheck(this, VotingContainer);

	            var votingWrapper = document.createElement('section'),
	                votingTitle = document.createElement('div');

	            votingWrapper.className = 'voting-wrapper';
	            votingTitle.className = 'voting-title';
	            votingContent.className = 'voting-content';

	            votingTitle.innerHTML = label;

	            votingList.forEach(function (voting) {
	                return votingContent.appendChild(voting);
	            });
	            votingWrapper.appendChild(votingTitle);
	            votingWrapper.appendChild(votingContent);

	            document.body.appendChild(votingWrapper);
	        }

	        _createClass(VotingContainer, [{
	            key: 'pushSection',
	            value: function pushSection(title, description) {
	                var votingSection = document.createElement('div');
	                votingSection.innerHTML = '<div class="voting-section-title">' + title + '</div>\n                <div class="voting-section-description">' + description + '</div>\n                <div class="voting-section-submit"><button>Vote</button></div>';

	                votingContent.appendChild(votingSection);
	                votingList.push(votingSection);
	                return this;
	            }
	        }, {
	            key: 'popSection',
	            value: function popSection() {
	                var votingSection = votingList.pop();
	                votingSection.parentNode.removeChild(votingSection);
	                return this;
	            }
	        }, {
	            key: 'getSection',
	            value: function getSection(index) {
	                if (index >= votingList) {
	                    throw new Error('error with count');
	                }
	                return votingList[index];
	            }
	        }]);

	        return VotingContainer;
	    }();
	}(document);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by vinfinit on 8/7/16.
	 */

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

	exports.default = RequestManager;

/***/ }
/******/ ]);