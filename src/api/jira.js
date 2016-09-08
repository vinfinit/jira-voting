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

    let isVoiced = false,
        localStorageName = 'votingBlock';

    class JiraVoting {
        constructor() {
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
            }

            this.config.authorization = {
                userName: config.userName,
                password: config.password
            };

            this.config.timeBlock = config.timeBlock || 24 * 60 * 60 * 1000;

            this.config.onClose = () => {
                let localStorage = window.localStorage;
                if (isVoiced && localStorage) {
                    localStorage.setItem(localStorageName, new Date().getTime());
                }
                if (config.onClose) {
                    config.onClose();
                }
            }
        }

        init(config) {
            this.setConfig(config);

            let lastDate = localStorage.getItem(localStorageName);
            if (lastDate && lastDate + this.config.timeBlock > new Date().getTime()) {
                return;
            }

            userVoting = userVoting ? userVoting : new UserVoting(this.config);
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
            if (!checkCondition()) {
                return this;
            }

            var config = this.config;
            RequestManager.getRequest(
                `${config.proxyPass}rest/api/2/search?${JqlStringBuilder.url(config)}`,
                null,
                {'Authorization': `Basic ${btoa(config.authorization.userName + ':' + config.authorization.password)}`},
                cb);
            return this;
        }

        pushIssue(issue, cb) {
            if (!checkCondition()) {
                return this;
            }

            var header = this.config.issue.header,
                body = this.config.issue.body;

            userVoting.pushSection(header ? issue.fields[header] : '', body ? issue.fields[body] : '', cb);
            return this;
        }

        updateIssue(issue, votingField, cb) {
            if (!checkCondition()) {
                return this;
            }

            var config = this.config,
                body = {fields: {}};

            isVoiced = true;

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

    function checkCondition() {
        if (userVoting) {
            return true;
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