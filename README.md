# User Voting

## Widget that allows user to vote for stories directly in JIRA project backlog.

#### Include main modules
```javascript
<link rel="stylesheet" href="/user-voting/dist/voting.css">
<script src="/user-voting/dist/index.js"/>

var jiraVoting = UserVoting.module('api.jira');
```

### Set config
```javascript
var config = {
  proxyPass: '',                    // path to nginx
  title: '',                        // title of widget
  jqlString: '',
  jqlComponents: {                  // optional. jqlString has more priority
    project: 'EPMDHMTEST',
    issueTypes: ['Story', 'Bug'],
    labels: ''
  },
  votingField: 'customfield_10005', // Jira field will be increment.  **Note: field must be a number**
  columnCount: 3,
  issue: {
      header: ''                    // field from response of Jira added to header of column.  default null
      body: 'summary'               // field from response of Jira added to body of column.  default null
  },
  message: {
      success: 'Vote is accepted!',
      failure: 'Oops... something happened!'
  },
  userName: ''                      // Jira user name
  password: ''                      // Jira password
}
```

### Init jira voting
```javascript
jiraVoting.init(config);
```
