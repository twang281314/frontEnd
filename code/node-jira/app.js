var JiraClient = require('jira-connector');

var jira = new JiraClient({
    host: 'jira.iscs.com.cn',
    protocol: 'http',
    basic_auth: {
        username: 'wangtao',
        password: '8002381'
    }
});

// jira.issue.getIssue({
//     issueKey: 'XDW-1927'
// }, function(error, issue) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(issue);
//     }
// });

// jira.filter.getFilter({
//     filterId: 1000
// }, function(error, filter) {

//     if (error) {
//         console.log(error);
//     } else {
//         console.log(filter);
//     }
// });

jira.jql.getAutoCompleteData({}, function(error, result) {

    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});