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
            if (typeof headers === 'function') {
                cb = headers;
                headers = {};
            }
            headers['Content-type'] = 'application/json; charset=utf-8';

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