var Client = require('node-rest-client').Client;
client = new Client();
// Provide user credentials, which will be used to log in to JIRA.
var loginArgs = {
    data: {
        "username": "wangtao",
        "password": "5666666"
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
                // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                jql: "type=Bug AND status=Closed"
            }
        };
        // Make the request return the search results, passing the header information including the cookie.
        client.post("http://jira.iscs.com.cn/rest/api/2/search", searchArgs, function(searchResult, response) {
            console.log('status code:', response.statusCode);
            console.log('search result:', searchResult);
        });
    } else {
        throw "Login failed :("+JSON.stringify(response);
    }
});