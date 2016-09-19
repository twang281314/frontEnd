var JiraClient = require('jira-connector');

var jira = new JiraClient({
    host: 'jira.iscs.com.cn',
    protocol: 'http',
    basic_auth: {
        username: 'wangtao',
        password: '*****'
    }
});

jira.issue.getIssue({
    issueKey: 'XDW-1891'
}, function(error, issue) {
    if (error) {
        console.log(error);
    } else {
        console.log(issue);
    }
});

jira.filter.getFilter({
    filterId: 1000
}, function(error, filter) {

    if (error) {
        console.log(error);
    } else {
        console.log(filter);
    }
});