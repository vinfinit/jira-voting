/**
 * Created by vinfinit on 8/7/16.
 */

export default
    class RequestManager {
        static putRequest(url, data, cb) {
            var headers = {
                'Content-type': 'application/json; charset=utf-8'
            };
            RequestManager.request('PUT', url, data, headers, cb);
        }

        static getRequest(url, data, cb) {
            RequestManager.request('GET', url, data, null, cb);
        }

        static request(type, url, data, headers, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                })
            }
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('uladzimir_artsemenka' + ':' + 'GysnGlb379dv8'));

            xhr.send(data);

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                cb(xhr.responseText);
            };
        }
    }