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
        constructor(project, issueTypes, labels) {
            this.config = {};
            this.setConfig({project, issueTypes, labels});
        }

        setConfig(config) {
            this.config.project = config.project;
            this.config.issueTypes = config.issueTypes;
            this.config.labels = config.labels;
        }

        getIssues(cb) {
            var config = this.config;
            // AND labels IN (${toJqlString(config.labels)})
            RequestManager.getRequest(
                `https://localhost:8080/proxy/jira/rest/api/2/search?jql=project = ${config.project} AND issuetype IN (${toJqlString(config.issueTypes)})&maxResults=10`,
                null,
                cb);
        }

        pushIssue(issue) {
            userVoting.pushSection(issue.key, issue.fields.issuetype.description, () => console.log('hello'))
        }

        updateIssue(issue, body, cb) {
            RequestManager.putRequest(`https://localhost:8080/proxy/jira/rest/api/2/issue/${issue}`, body, cb);
        }
    }

    function toJqlString(item) {
        return Array.isArray(item) ? item.join(',') : item;
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module('api.jira');
}

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