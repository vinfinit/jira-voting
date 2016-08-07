/**
 * Created by vinfinit on 8/7/16.
 */

import VotingDom from './modules/votingDom';

export default (function(window) {

    let votingDom = new VotingDom();

    class UserVoting {
        constructor() {}

        static module(path) {
            return UserVoting.register(path);
        }

        static register(path, module) {
            let modules = path.split('.'),
                curModule = UserVoting;

            for (let i = 0; i < modules.length; i++) {
                if (!curModule[modules[i]]) {
                    curModule[modules[i]] = {};
                }
                if (i === modules.length - 1 && module) {
                    curModule[modules[i]] = module;
                }
                curModule = curModule[modules[i]];
            }

            return curModule;
        }

        pushSection(title, description, cb) {
            votingDom.pushSection(title, description, cb);
            return this;
        }

        popSection() {
            votingDom.popSection();
            return this;
        }
    }

    // for debug
    window.UserVoting = UserVoting;

    return UserVoting;
}(window))

import Jira from './api/jira';
var jira = Jira(window.UserVoting);
window.jira = jira;

var config = {
    project: "EPMDHMTEST",
    issueTypes: "Story",
    labels: ''
};
jira.setConfig(config);
jira.getIssues((data) => {
    var issues = JSON.parse(data).issues;
    window.issue = issues[0];
    console.log(issues)
});