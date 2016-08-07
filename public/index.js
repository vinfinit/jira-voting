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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _votingDom = __webpack_require__(1);

	var _votingDom2 = _interopRequireDefault(_votingDom);

	var _jira = __webpack_require__(2);

	var _jira2 = _interopRequireDefault(_jira);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	exports.default = function (window) {

	    var votingDom = new _votingDom2.default();

	    var UserVoting = function () {
	        function UserVoting() {
	            _classCallCheck(this, UserVoting);
	        }

	        _createClass(UserVoting, [{
	            key: 'pushSection',
	            value: function pushSection(title, description, cb) {
	                votingDom.pushSection(title, description, cb);
	                return this;
	            }
	        }, {
	            key: 'popSection',
	            value: function popSection() {
	                votingDom.popSection();
	                return this;
	            }
	        }], [{
	            key: 'module',
	            value: function module(path) {
	                return UserVoting.register(path);
	            }
	        }, {
	            key: 'register',
	            value: function register(path, module) {
	                var modules = path.split('.'),
	                    curModule = UserVoting;

	                for (var i = 0; i < modules.length; i++) {
	                    if (!curModule[modules[i]]) {
	                        curModule[modules[i]] = {};
	                    }
	                    if (i === modules.length - 1 && module) {
	                        curModule[modules[i]] = module;
	                    }
	                    curModule = curModule[modules[i]];
	                }

	                return curModule;
	            }
	        }]);

	        return UserVoting;
	    }();

	    // for debug


	    window.UserVoting = UserVoting;

	    return UserVoting;
	}(window);

	(0, _jira2.default)(window.UserVoting);

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
	            value: function pushSection(title, description, cb) {
	                var votingSection = document.createElement('div');
	                votingSection.innerHTML = '<div class="voting-section-title">' + title + '</div>\n                <div class="voting-section-description">' + description + '</div>\n                <div class="voting-section-submit"><button onclick="cb()">Vote</button></div>';

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	//var body = {
	//    'fields': {
	//        'labels': ['Epic']
	//    }
	//};
	//
	//var config = {
	//    project: "EPMDHMTEST",
	//    issueTypes: "Story",
	//    labels: ''
	//};
	//
	//jiraVoting.setConfig(config);
	//
	//jiraVoting.getIssues(data => {
	//    var data = JSON.parse(data);
	//    data.issues;
	//});
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	exports.default = function (UserVoting) {
	    if (!UserVoting) {
	        throw new Error('Module UserVoting not found!');
	    }

	    var JiraVoting = function () {
	        function JiraVoting(project, issueTypes, labels) {
	            _classCallCheck(this, JiraVoting);

	            this.config = {};
	            this.setConfig({ project: project, issueTypes: issueTypes, labels: labels });
	        }

	        _createClass(JiraVoting, [{
	            key: 'setConfig',
	            value: function setConfig(config) {
	                this.config.project = config.project;
	                this.config.issueTypes = config.issueTypes;
	                this.config.labels = config.labels;
	            }
	        }, {
	            key: 'getIssues',
	            value: function getIssues(cb) {
	                var config = this.config;
	                // AND labels IN (${toJqlString(config.labels)})
	                _requestManager2.default.getRequest('https://localhost:8080/proxy/jira/rest/api/2/search?jql=project = ' + config.project + ' AND issuetype IN (' + toJqlString(config.issueTypes) + ')&maxResults=10', null, cb);
	            }
	        }, {
	            key: 'updateIssue',
	            value: function updateIssue(issue, body, cb) {
	                _requestManager2.default.putRequest('https://localhost:8080/proxy/jira/rest/api/2/issue/' + issue, body, cb);
	            }
	        }]);

	        return JiraVoting;
	    }();

	    function toJqlString(item) {
	        return Array.isArray(item) ? item.join(',') : item;
	    }

	    UserVoting.register('api.jira', new JiraVoting());

	    return JiraVoting;
	};

	var _requestManager = __webpack_require__(3);

	var _requestManager2 = _interopRequireDefault(_requestManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***/ },
/* 3 */
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
	            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('uladzimir_artsemenka' + ':' + 'GysnGlb379dv8'));

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