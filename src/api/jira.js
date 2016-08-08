/**
 * Created by vinfinit on 8/7/16.
 */

import RequestManager from '../modules/requestManager';

export default function (UserVoting) {
    if (!UserVoting) {
        throw new Error('Module UserVoting not found!');
    }

    let userVoting = new UserVoting();

    class JiraVoting {
        constructor() {
            this.config = {};
        }

        setConfig(config) {
            this.config.proxyPass = config.proxyPass;
            this.config.project = config.project;
            this.config.issueTypes = config.issueTypes;
            this.config.labels = config.labels;
        }

        getIssues(cb) {
            var config = this.config;
            // AND labels IN (${toJqlString(config.labels)})
            RequestManager.getRequest(
                `${this.config.proxyPass}rest/api/2/search?jql=project = ${config.project} AND issuetype IN (${toJqlString(config.issueTypes)})&maxResults=10`,
                null,
                cb);
        }

        pushIssue(issue) {
            userVoting.pushSection(issue.key, issue.fields.issuetype.description, () => console.log('hello'))
        }

        updateIssue(issue, body, cb) {
            RequestManager.putRequest(`${this.config.proxyPass}rest/api/2/issue/${issue}`, body, cb);
        }
    }

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module('api.jira');
}