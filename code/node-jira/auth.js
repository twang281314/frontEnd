var Client = require('node-rest-client').Client;
client = new Client();
// Provide user credentials, which will be used to log in to JIRA.
var loginArgs = {
    data: {
        "username": "wangtao",
        "password": "8002381"
    },
    headers: {
        "Content-Type": "application/json"
    }
};
client.post("http://jira.iscs.com.cn/rest/auth/1/session", loginArgs, function(data, response) {
    if (response.statusCode == 200) {
        console.log('succesfully logged in, session:', data.session);
        var session = data.session;
        // Get the session information and store it in a cookie in the header
        var searchArgs = {
            headers: {
                // Set the cookie from the session information
                cookie: session.name + '=' + session.value,
                "Content-Type": "application/json"
            },
            data: {
                "jql": "project = XDW AND issuetype in (任务, 子任务) AND Sprint = 302 ORDER BY summary DESC, status ASC, Rank ASC",
                // "jql": "project = XDW-1915",
                "startAt": 0,
                "maxResults": 100,
                "fields": [
                    "summary",
                    "status",
                    "assignee",
                    "aggregatetimeoriginalestimate",
                    "aggregatetimespent",
                    "aggregateprogress",
                    "aggregatetimeestimate"
                ]
               
            }
        };
        // Make the request return the search results, passing the header information including the cookie.
        client.post("http://jira.iscs.com.cn/rest/api/2/search", searchArgs, function(searchResult, response) {
            console.log('status code:', response);
            console.log('search result:', searchResult);
        });
    } else {
        console.log(response);
    }
});