/**
 * Created by vinfinit on 8/7/16.
 */

import RequestManager from '../modules/requestManager';

export default function (UserVoting) {
    if (!UserVoting) {
        throw new Error('Module UserVoting not found!');
    }

    let userVoting;

    class JiraVoting {
        constructor(title) {
            userVoting = new UserVoting(title);
            this.config = {};
        }

        setConfig(config) {
            this.config.proxyPass = config.proxyPass;
            this.config.project = config.project;
            this.config.issueTypes = config.issueTypes;
            this.config.labels = config.labels;

            this.config.userName = config.userName;
            this.config.password = config.password;
        }

        getIssues(cb) {
            var config = this.config;
            RequestManager.getRequest(
                `${config.proxyPass}rest/api/2/search?${JqlStringBuilder(config)}`,
                null,
                {'Authorization': `Basic ${btoa(config.authorization.userName + ':' + config.authorization.password)}`},
                cb);
        }

        pushIssue(issue) {
            userVoting.pushSection(issue.key, issue.fields.issuetype.description, () => console.log('hello'))
        }

        updateIssue(issue, body, cb) {
            RequestManager.putRequest(`${this.config.proxyPass}rest/api/2/issue/${issue}`, body, cb);
        }
    }

    class JqlStringBuilder {
        static createUrl(config) {
            let jqlString = `jql=project = ${config.project}`;
            if (config.issueTypes) {
                jqlString += ` AND issuetype IN (${JqlStringBuilder.create(config.issueTypes)})`;
            }
            if (config.labels) {
                jqlString += ` AND labels IN (${JqlStringBuilder.create(config.labels)})`;
            }
        }

        static create(item) {
            return Array.isArray(item) ? item.join(',') : item;
        }
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module('api.jira');
}