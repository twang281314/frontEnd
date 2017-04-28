
App.registerView({
    path:"/home",
    el:"#home",
    home:false
});

App.registerView({
    path:"/home/busiProcessing",
    el:"#homeBusiProcessing",
    home:true,
    parent:"#home"
});

App.registerView({
    path:"/home/message",
    el:"#homeMessage",
    home:false,
    parent:"#home"
});

App.registerView({
    path:"/home/transactQuery",
    el:"#homeTransactQuery",
    home:false,
    parent:"#home"
});

App.registerView({
    path:"/home/me",
    el:"#homeMe",
    home:false,
    parent:"#home"
});

App.registerView({
    path:"/openAccount/index",
    el:"#openAccountIndex",
    home:false
});

App.registerView({
    path:"/login/success",
    el:"#loginSuccess",
    home:false
});
