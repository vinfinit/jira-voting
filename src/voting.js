/**
 * Created by Uladzimir_Artsemenka on 7/14/2016.
 */

var body = {
    'fields': {
        'labels': ['Epic']
    }
};

;(function () {

    class JiraVoting {
        constructor(project, issueTypes, labels) {
            this._config = {};
            this.setConfig({project, issueTypes, labels});
        }

        get config() {
            return this._config;
        }

        setConfig(config) {
            this._config.project = config.project;
            this._config.issueTypes = config.issueTypes;
            this._config.labels = config.labels;
        }

        getIssues(cb) {
            var config = this._config;
            RequestManager.getRequest(
                `https://epbyminw5131/proxy/jira/rest/api/2/search?jql=project = ${config.project} AND issuetype IN (${toJqlString(config.issueTypes)}) AND labels IN (${toJqlString(config.labels)})`,
                null,
                cb);
        }

        updateIssue(issue, body, cb) {
            RequestManager.putRequest(`https://epbyminw5131/proxy/jira/rest/api/2/issue/${issue}`, body, cb);
        }
    }

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
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('username' + ':' + 'password'));

            xhr.send(data);

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                cb(xhr.responseText);
            };
        }
    }

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    window.jiraVoting = new JiraVoting();

}());