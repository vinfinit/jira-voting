/**
 * Created by vinfinit on 8/7/16.
 */

import VotingDom from './modules/votingDom';
import RequestManager from './modules/requestManager';

var body = {
    'fields': {
        'labels': ['Epic']
    }
};

;(function (window) {

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
                `https://localhost:8080/proxy/jira/rest/api/2/search?jql=project = ${config.project} AND issuetype IN (${toJqlString(config.issueTypes)}) AND labels IN (${toJqlString(config.labels)})&maxResults=10`,
                null,
                cb);
        }

        updateIssue(issue, body, cb) {
            RequestManager.putRequest(`https://localhost:8080/proxy/jira/rest/api/2/issue/${issue}`, body, cb);
        }
    }

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    window.jiraVoting = new JiraVoting();

}(window));

var config = {
    project: "EPMDHMPERF",
    issueTypes: "Story",
    labels: 'wow'
};

jiraVoting.setConfig(config);