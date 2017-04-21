;
(function () {
  App.defineViewModel("#openAccountIndex", {
    data: {},
    watch: {},
    methods: {}
  }, {
    ready: function () {},
    beforeRender: function (params) {},
    afterRender: function (params) {
      var loading = weui.loading('loading', {
        className: 'custom-classname'
      });
      setTimeout(function () {
        loading.hide(function () {
          console.log('`loading` has been hidden');
        });
      }, 3000);
    },
    beforeUnRender: function () {},
    afterUnRender: function () {}
  });
})();