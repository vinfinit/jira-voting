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

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _votingDom = __webpack_require__(2);

	var _votingDom2 = _interopRequireDefault(_votingDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	exports.default = function (window) {

	    var votingDom = void 0;

	    var UserVoting = function () {
	        function UserVoting(title) {
	            _classCallCheck(this, UserVoting);

	            votingDom = new _votingDom2.default(title);
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
	        }, {
	            key: 'clear',
	            value: function clear() {
	                votingDom.clear();
	                return this;
	            }
	        }, {
	            key: 'setTitle',
	            value: function setTitle(title) {
	                votingDom.setTitle(title);
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

	    window.UserVoting = UserVoting;

	    return UserVoting;
	}(window);

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

	exports.default = function (document) {

	    var votingList = [],
	        votingContent = document.createElement('section'),
	        votingTitle = document.createElement('div');

	    return function () {
	        function VotingContainer(label) {
	            _classCallCheck(this, VotingContainer);

	            var votingWrapper = document.createElement('section'),
	                votingHeader = document.createElement('div'),
	                votingClose = document.createElement('button');

	            votingWrapper.className = 'voting-wrapper';
	            votingHeader.className = 'voting-header';
	            votingTitle.className = 'voting-title';
	            votingContent.className = 'voting-content';
	            votingClose.className = 'voting-close';

	            votingTitle.innerHTML = '<span>' + label + '</span>';
	            votingClose.innerHTML = 'X';
	            votingClose.onclick = function () {
	                return votingWrapper.parentNode.removeChild(votingWrapper);
	            };
	            votingHeader.appendChild(votingTitle);
	            votingHeader.appendChild(votingClose);

	            votingList.forEach(function (voting) {
	                return votingContent.appendChild(voting);
	            });
	            votingWrapper.appendChild(votingHeader);
	            votingWrapper.appendChild(votingContent);

	            document.body.appendChild(votingWrapper);
	        }

	        _createClass(VotingContainer, [{
	            key: 'setTitle',
	            value: function setTitle(label) {
	                votingTitle.innerHTML = label;
	            }
	        }, {
	            key: 'pushSection',
	            value: function pushSection(title, description, cb) {
	                var votingSection = document.createElement('div'),
	                    submitSection = document.createElement('div'),
	                    submitButton = document.createElement('button');

	                submitButton.onclick = cb;
	                submitButton.innerText = 'Vote';
	                submitSection.appendChild(submitButton);
	                submitSection.className += ' voting-section-submit';

	                votingSection.innerHTML = '<div class="voting-section-title">' + title + '</div>\n                <div class="voting-section-description">' + description + '</div>';
	                votingSection.appendChild(submitSection);

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
	            key: 'clear',
	            value: function clear() {
	                while (votingList.length) {
	                    this.popSection();
	                }
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _requestManager = __webpack_require__(4);

	var _requestManager2 = _interopRequireDefault(_requestManager);

	var _setCollection = __webpack_require__(5);

	var _setCollection2 = _interopRequireDefault(_setCollection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	exports.default = function (UserVoting) {
	    if (!UserVoting) {
	        throw new Error('Module UserVoting not found!');
	    }

	    var userVoting = void 0;

	    var JiraVoting = function () {
	        function JiraVoting() {
	            _classCallCheck(this, JiraVoting);

	            userVoting = new UserVoting();
	            this.config = {};
	        }

	        _createClass(JiraVoting, [{
	            key: 'setConfig',
	            value: function setConfig(config) {
	                this.config.proxyPass = config.proxyPass;
	                this.config.jqlString = config.jqlString;
	                this.config.columnCount = config.columnCount || 2;
	                this.config.issue = {
	                    header: config.issue.header,
	                    body: config.issue.body
	                };

	                if (config.jqlComponents) {
	                    this.config.jqlComponents = {
	                        project: config.jqlComponents.project,
	                        issueTypes: config.jqlComponents.issueTypes,
	                        labels: config.jqlComponents.labels
	                    };
	                }

	                if (config.title) {
	                    this.config.title = config.title;
	                    userVoting.setTitle(this.config.title);
	                }

	                this.config.authorization = {
	                    userName: config.userName,
	                    password: config.password
	                };
	            }
	        }, {
	            key: 'init',
	            value: function init(body) {
	                var _this = this;

	                this.clear();
	                this.getIssues(function (data) {
	                    var issues = JSON.parse(data).issues,
	                        indexes = new _setCollection2.default();
	                    for (var i = 0; i < _this.config.columnCount; i++) {
	                        var index = Math.ceil(Math.random() * (issues.length - 1));
	                        if (indexes.has(index)) {
	                            i--;
	                            continue;
	                        }
	                        indexes.add(index);
	                        var issue = issues[index];
	                        _this.pushIssue(issue, function () {
	                            return _this.updateIssue(issue, JSON.stringify(body), function () {
	                                return _this.init(_this.config.columnCount, body);
	                            });
	                        });
	                    }
	                });
	            }
	        }, {
	            key: 'getIssues',
	            value: function getIssues(cb) {
	                var config = this.config;
	                _requestManager2.default.getRequest(config.proxyPass + 'rest/api/2/search?' + JqlStringBuilder.url(config), null, { 'Authorization': 'Basic ' + btoa(config.authorization.userName + ':' + config.authorization.password) }, cb);
	                return this;
	            }
	        }, {
	            key: 'pushIssue',
	            value: function pushIssue(issue, cb) {
	                var header = this.config.issue.header,
	                    body = this.config.issue.body;

	                userVoting.pushSection(header ? issue.fields[header] : '', body ? issue.fields[body] : '', cb);
	                return this;
	            }
	        }, {
	            key: 'updateIssue',
	            value: function updateIssue(issue, body, cb) {
	                var config = this.config;
	                _requestManager2.default.putRequest(this.config.proxyPass + 'rest/api/2/issue/' + issue.key, body, { 'Authorization': 'Basic ' + btoa(config.authorization.userName + ':' + config.authorization.password) }, cb);
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
	                var jqlString = 'jql=';
	                if (config.jqlString) {
	                    jqlString += '' + config.jqlString;
	                    return jqlString;
	                }
	                if (!config.jqlString && config.jqlComponents) {
	                    var components = config.jqlComponents;
	                    if (components.project) {
	                        jqlString += 'project = ' + components.project;
	                    }
	                    if (components.issueTypes) {
	                        jqlString += ' AND issuetype IN (' + JqlStringBuilder.create(components.issueTypes) + ')';
	                    }
	                    if (components.labels) {
	                        jqlString += ' AND labels IN (' + JqlStringBuilder.create(components.labels) + ')';
	                    }
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
	}(UserVoting);

/***/ },
/* 4 */
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
	        value: function putRequest(url, body, headers, cb) {
	            RequestManager.request('PUT', url, body, headers, cb);
	        }
	    }, {
	        key: 'getRequest',
	        value: function getRequest(url, body, headers, cb) {
	            RequestManager.request('GET', url, body, headers, cb);
	        }
	    }, {
	        key: 'request',
	        value: function request(type, url, body, headers, cb) {
	            var xhr = new XMLHttpRequest();
	            xhr.open(type, url, true);

	            if (typeof headers === 'function') {
	                cb = headers;
	                headers = {};
	            }
	            headers['Content-type'] = 'application/json; charset=utf-8';

	            if (headers) {
	                Object.keys(headers).forEach(function (key) {
	                    xhr.setRequestHeader(key, headers[key]);
	                });
	            }

	            xhr.send(body);

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState != 4) return;
	                cb(xhr.responseText);
	            };
	        }
	    }]);

	    return RequestManager;
	}();

	exports.default = RequestManager;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d = __webpack_require__(6),
	    SetCollection = __webpack_require__(18);

	Object.defineProperties(SetCollection.prototype, {
		forEach: d(__webpack_require__(26)),
		isCopy: d(__webpack_require__(27))
	});

	module.exports = SetCollection;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isCallable = __webpack_require__(7),
	    callable = __webpack_require__(8),
	    validValue = __webpack_require__(9),
	    copy = __webpack_require__(10),
	    map = __webpack_require__(15),
	    isString = __webpack_require__(16),
	    contains = __webpack_require__(17),
	    bind = Function.prototype.bind,
	    defineProperty = Object.defineProperty,
	    d;

	d = module.exports = function (dscr, value) {
		var c, e, w;
		if (arguments.length < 2) {
			value = dscr;
			dscr = null;
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		return { value: value, configurable: c, enumerable: e, writable: w };
	};

	d.gs = function (dscr, get, set) {
		var c, e;
		if (isCallable(dscr)) {
			set = get == null ? undefined : callable(get);
			get = dscr;
			dscr = null;
		} else {
			get = get == null ? undefined : callable(get);
			set = set == null ? undefined : callable(set);
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		return { get: get, set: set, configurable: c, enumerable: e };
	};

	d.binder = function self(name, dv) {
		var value, dgs;
		if (!isString(name)) {
			return map(name, function (dv, name) {
				return self(name, dv);
			});
		}
		value = validValue(dv) && callable(dv.value);
		dgs = copy(dv);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			dv.value = bind.call(value, this);
			defineProperty(this, name, dv);
			return this[name];
		};
		return dgs;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Inspired by: http://www.davidflanagan.com/2009/08/typeof-isfuncti.html

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var forEach = Array.prototype.forEach.bind([]);

	module.exports = function (obj) {
		var type;
		if (!obj) {
			return false;
		}
		type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
		if (type === 'function') {
			return true;
		}
		if (type !== 'object') {
			return false;
		}

		try {
			forEach(obj);
			return true;
		} catch (e) {
			if (e instanceof TypeError) {
				return false;
			}
			throw e;
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isCallable = __webpack_require__(7);

	module.exports = function (fn) {
		if (!isCallable(fn)) {
			throw new TypeError(fn + " is not a function");
		}
		return fn;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) {
			throw new TypeError("Cannot use null or undefined");
		}
		return value;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isPlainObject = __webpack_require__(11),
	    forEach = __webpack_require__(12),
	    extend = __webpack_require__(14),
	    value = __webpack_require__(9),
	    _recursive;

	_recursive = function recursive(to, from, cloned) {
		forEach(from, function (value, key) {
			var index;
			if (isPlainObject(value)) {
				if ((index = cloned[0].indexOf(value)) === -1) {
					cloned[0].push(value);
					cloned[1].push(to[key] = extend({}, value));
					_recursive(to[key], value, cloned);
				} else {
					to[key] = cloned[1][index];
				}
			}
		}, from);
	};

	module.exports = function (obj /*, deep*/) {
		var copy;
		if ((copy = Object(value(obj))) === obj) {
			copy = extend({}, obj);
			if (arguments[1]) {
				_recursive(copy, obj, [[obj], [copy]]);
			}
		}
		return copy;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var getPrototypeOf = Object.getPrototypeOf,
	    prototype = Object.prototype,
	    toString = prototype.toString,
	    id = {}.toString();

	module.exports = function (value) {
		var proto;
		if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || toString.call(value) !== id) {
			return false;
		}
		proto = getPrototypeOf(value);
		return proto === prototype || getPrototypeOf(proto) === null;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13)('forEach');

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order

	'use strict';

	var isCallable = __webpack_require__(7),
	    callable = __webpack_require__(8),
	    value = __webpack_require__(9),
	    call = Function.prototype.call,
	    keys = Object.keys;

	module.exports = function (method) {
		return function (obj, cb /*, thisArg, compareFn*/) {
			var list,
			    thisArg = arguments[2],
			    compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort(isCallable(compareFn) ? compareFn.bind(obj) : undefined);
			}
			return list[method](function (key, index) {
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var value = __webpack_require__(9),
	    forEach = Array.prototype.forEach,
	    slice = Array.prototype.slice,
	    keys = Object.keys,
	    extend;

	extend = function extend(src) {
		keys(Object(src)).forEach(function (key) {
			this[key] = src[key];
		}, this);
	};

	module.exports = function (dest /*, …src*/) {
		forEach.call(arguments, value);
		slice.call(arguments, 1).forEach(extend, dest);
		return dest;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var callable = __webpack_require__(8),
	    forEach = __webpack_require__(12),
	    call = Function.prototype.call;

	module.exports = function (obj, cb /*, thisArg*/) {
		var o = {},
		    thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toString = Object.prototype.toString,
	    id = toString.call('');

	module.exports = function (x) {
			return typeof x === 'string' || x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && (x instanceof String || toString.call(x) === id) || false;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var contains = __webpack_require__(19),
	    copy = __webpack_require__(23),
	    remove = __webpack_require__(24),
	    uniq = __webpack_require__(25),
	    d = __webpack_require__(6),
	    isArray = Array.isArray,
	    forEach = Array.prototype.forEach,
	    push = Array.prototype.push,
	    defineProperty = Object.defineProperty,
	    Constructor,
	    SetCollection;

	Constructor = function Constructor() {};
	module.exports = SetCollection = function SetCollection() {
		var set = new Constructor(),
		    values = [];

		forEach.call(arguments, function self(value) {
			if (value._isSet_) push.apply(this, value.values);else if (isArray(value)) push.apply(this, value);else this.push(value);
		}, values);

		defineProperty(set, '_values', d('c', uniq.call(values)));
		set.count = set._values.length;
		return set;
	};

	Constructor.prototype = Object.defineProperties(SetCollection.prototype, {
		_isSet_: d(true),
		add: d(function (value) {
			if (this.has(value)) return;
			this._values.push(value);
			++this.count;
		}),
		delete: d(function (value) {
			if (!this.has(value)) return;
			remove.call(this._values, value);
			--this.count;
		}),
		has: d(function (value) {
			return contains.call(this._values, value);
		}),
		values: d.gs(function () {
			return copy.call(this._values);
		})
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOf = __webpack_require__(20);

	module.exports = function (searchElement /*, position*/) {
		return indexOf.call(this, searchElement, arguments[1]) > -1;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var numIsNaN = __webpack_require__(21),
	    ois = __webpack_require__(22),
	    value = __webpack_require__(9),
	    indexOf = Array.prototype.indexOf;

	module.exports = function (searchElement /*, fromIndex*/) {
		var i;
		if (!numIsNaN(searchElement) && searchElement !== 0) {
			return indexOf.apply(this, arguments);
		}

		for (i = arguments[1] >>> 0; i < value(this).length >>> 0; ++i) {
			if (this.hasOwnProperty(i) && ois(searchElement, this[i])) {
				return i;
			}
		}
		return -1;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		return value !== value; //jslint: skip
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// Implementation credits go to:
	// http://wiki.ecmascript.org/doku.php?id=harmony:egal

	'use strict';

	module.exports = function (x, y) {
			return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y; //jslint: skip
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var slice = Array.prototype.slice;

	module.exports = function () {
		return slice.call(this);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOf = __webpack_require__(20),
	    forEach = Array.prototype.forEach,
	    splice = Array.prototype.splice;

	module.exports = function () /*item*/{
		forEach.call(arguments, function (item) {
			var index = indexOf.call(this, item);
			if (index !== -1) {
				splice.call(this, index, 1);
			}
		}, this);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOf = __webpack_require__(20),
	    filter = Array.prototype.filter,
	    isFirst;

	isFirst = function isFirst(value, index) {
	  return indexOf.call(this, value) === index;
	};

	module.exports = function () {
	  return filter.call(this, isFirst, this);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var callable = __webpack_require__(8),
	    call = Function.prototype.call;

	module.exports = function (cb /*, thisArg*/) {
		var thisArg = arguments[1];
		callable(cb);
		this._values.forEach(function (value, index) {
			call.call(cb, thisArg, value, null, this, index);
		}, this);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validValue = __webpack_require__(9);

	module.exports = function (value) {
		validValue(value);
		if (value._isSet_) value = value.values;
		if (value.length !== this.count) return false;
		return value.every(function (value) {
			return this.has(value);
		}, this);
	};

/***/ }
/******/ ]);