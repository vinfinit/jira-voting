/**
 * Created by vinfinit on 8/7/16.
 */

import RequestManager from '../modules/requestManager';
import Set from 'set-collection';

export default (function(UserVoting) {
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
            this.config.jqlString = config.jqlString;
            this.config.columnCount = config.columnCount || 2;
            this.config.votingField = config.votingField;
            this.config.issue = {
                header: config.issue.header,
                body: config.issue.body
            };

            if (config.jqlComponents) {
                this.config.jqlComponents = {
                    project: config.jqlComponents.project,
                    issueTypes: config.jqlComponents.issueTypes,
                    labels: config.jqlComponents.labels
                };
            }

            if (config.title) {
                this.config.title = config.title;
                userVoting.setTitle(this.config.title);
            }

            this.config.authorization = {
                userName: config.userName,
                password: config.password
            };
        }

        init(config) {
            this.setConfig(config);
            this.clear();
            this.getIssues(data => {
                let issues = JSON.parse(data).issues,
                    indexes = new Set();
                for (var i = 0; i < this.config.columnCount; i++) {
                    var index = Math.ceil(Math.random() * (issues.length - 1));
                    if (indexes.has(index)) {
                        i--;
                        continue;
                    }
                    indexes.add(index);
                    var issue = issues[index];
                    this.pushIssue(
                        issue,
                        () => this.updateIssue(issue, this.config.votingField, () => this.init(config)))
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
            var header = this.config.issue.header,
                body = this.config.issue.body;

            userVoting.pushSection(header ? issue.fields[header] : '', body ? issue.fields[body] : '', cb);
            return this;
        }

        updateIssue(issue, votingField, cb) {
            var config = this.config,
                body = { fields: {} };

            body.fields[votingField] = (parseInt(issue.fields[votingField]) || 0) + 1;

            RequestManager.putRequest(
                `${this.config.proxyPass}rest/api/2/issue/${issue.key}`,
                JSON.stringify(body),
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
            let jqlString = `jql=`;
            if (config.jqlString) {
                jqlString += `${config.jqlString}`;
                return jqlString;
            }
            if (!config.jqlString && config.jqlComponents) {
                let components = config.jqlComponents;
                if (components.project) {
                    jqlString += `project = ${components.project}`
                }
                if (components.issueTypes) {
                    jqlString += ` AND issuetype IN (${JqlStringBuilder.create(components.issueTypes)})`;
                }
                if (components.labels) {
                    jqlString += ` AND labels IN (${JqlStringBuilder.create(components.labels)})`;
                }
            }

            return jqlString;
        }

        static create(item) {
            return Array.isArray(item) ? item.join(',') : item;
        }
    }

    UserVoting.register('api.jira', new JiraVoting());

    return UserVoting.module(`api.jira`);
}(UserVoting));