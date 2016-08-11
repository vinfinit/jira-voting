<h1>User Voting</h1>

Widget that allows user to vote for stories directly in JIRA project backlog.

// Import all needed modules

import UserVoting from 'user-voting/public';
import JiraVoting from 'user-voting/public/api/jira';

var jiraVoting = JiraVoting(UserVoting);

// Set config
// project, issueTypes, labels uses for create JQL string

var config = {
  proxyPass: '',
  title: '',
  project: ''                       // Jira project
  issueTypes: ''                    // Jira issue types, example: ['Story', 'Task']
  labels: ''                        // Jira labels, example: ['wow']
  userName: ''                      // Jira user name
  password: ''                      // Jira password
}
jiraVoting.setConfig(config);

// Init preconfigure jira voting
// tableColumn - count of issue in table for voting
// body - body for PUT request to Jira in current issue

jiraVoting.init(tableColumn, body);
