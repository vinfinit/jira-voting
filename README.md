# User Voting

## Widget that allows user to vote for stories directly in JIRA project backlog.

### Import all needed modules
```javascript
import UserVoting from 'user-voting/public';
import JiraVoting from 'user-voting/public/api/jira';

var jiraVoting = JiraVoting(UserVoting);
```
#### or use jsp style
```javascript
<script src="https://raw.githubusercontent.com/vinfinit/UserVoting/master/public/index.js">
<script src="https://raw.githubusercontent.com/vinfinit/UserVoting/master/public/api/jira.js">

var jiraVoting = UserVoting.module('api.jira');
```

### Set config
#### jqlString or jqlComponents (uses JqlStringBuilder)
```javascript
var config = {
  proxyPass: '',                    // path to nginx
  title: '',
  jqlString: '',
  jqlComponents: {
    project: 'EPMDHMTEST',
    issueTypes: ['Story', 'Bug'],
    labels: ''
  },
  userName: ''                      // Jira user name
  password: ''                      // Jira password
}
jiraVoting.setConfig(config);
```

### Init preconfigure jira voting
#### columnCount - count of issue in table for voting
#### body - body for PUT request to Jira in current issue
```javascript
jiraVoting.init(columnCount, body);
```
Example:
```javascript
jiraVoting.init(2, {
      fields: {
          labels: ['votingTest3']
      }
  });
```
