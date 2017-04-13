;(function (win) {
    win.API = {

    };

    var prefix = "";
    function execute(method,func,cb) {
        Light.ajax({
            type:method,
            url:prefix+func,
            success:cb
        })
    }
})(window);