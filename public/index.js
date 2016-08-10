'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by vinfinit on 8/7/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = function () {

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

    return UserVoting;
};

var _votingDom = require('./modules/votingDom');

var _votingDom2 = _interopRequireDefault(_votingDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;