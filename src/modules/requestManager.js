/**
 * Created by vinfinit on 8/7/16.
 */

export default
    class RequestManager {
        static putRequest(url, body, headers, cb) {
            if (typeof headers === 'function') {
                cb = headers;
                headers = {};
            }
            headers['Content-type'] = 'application/json; charset=utf-8';

            RequestManager.request('PUT', url, body, headers, cb);
        }

        static getRequest(url, body, cb) {
            RequestManager.request('GET', url, body, null, cb);
        }

        static request(type, url, body, headers, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                })
            }

            xhr.send(body);

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                cb(xhr.responseText);
            };
        }
    }