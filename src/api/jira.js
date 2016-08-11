/**
 * Created by vinfinit on 8/7/16.
 */

import RequestManager from '../modules/requestManager';
import Set from 'set-collection';

export default function (UserVoting) {
    if (!UserVoting) {
        throw new Error('Module UserVoting not found!');
    }

    let userVoting;

    class JiraVoting {
        constructor() {
            userVoting = new UserVoting();
            this.config = {};
        }

        setConfig(config) {
            this.config.proxyPass = config.proxyPass;
            this.config.project = config.project;
            this.config.issueTypes = config.issueTypes;
            this.config.labels = config.labels;

            if (config.title) {
                this.config.title = config.title;
                userVoting.setTitle(this.config.title);
            }

            this.config.authorization = {
                userName: config.userName,
                password: config.password
            };
        }

        init(column, body) {
            this.clear();
            this.getIssues(data => {
                let issues = JSON.parse(data).issues,
                    indexes = new Set();
                for (let i = 0; i < column; i++) {
                    let index = Math.ceil(Math.random() * (issues.length - 1));
                    if (indexes.has(index)) {
                        i--;
                        continue;
                    }
                    let issue = issues[index];
                    this.pushIssue(
                        issue,
                        () => this.updateIssue(issue, JSON.stringify(body), () => this.init(column, body)))
                }
            });
        }

        getIssues(cb) {
            var config = this.config;
            RequestManager.getRequest(
                `${config.proxyPass}rest/api/2/search?${JqlStringBuilder.url(config)}`,
                null,
                {'Authorization': `Basic ${btoa(config.authorization.userName + ':' + config.authorization.password)}`},
                cb);
            return this;
        }

        pushIssue(issue, cb) {
            userVoting.pushSection(issue.key, issue.fields.issuetype.description, cb);
            return this;
        }

        updateIssue(issue, body, cb) {
            var config = this.config;
            RequestManager.putRequest(
                `${this.config.proxyPass}rest/api/2/issue/${issue.key}`,
                body,
                {'Authorization': `Basic ${btoa(config.authorization.userName + ':' + config.authorization.password)}`},
                cb);
            return this;
        }

        clear() {
            userVoting.clear();
            return this;
        }
    }

    class JqlStringBuilder {
        static url(config) {
            let jqlString = `jql=project = ${config.project}`;
            if (config.issueTypes) {
                jqlString += ` AND issuetype IN (${JqlStringBuilder.create(config.issueTypes)})`;
            }
            if (config.labels) {
                jqlString += ` AND labels IN (${JqlStringBuilder.create(config.labels)})`;
            }
            return jqlString;
        }

        static create(item) {
            return Array.isArray(item) ? item.join(',') : item;
        }
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module(`api.jira`);
}