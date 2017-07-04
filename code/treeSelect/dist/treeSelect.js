'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var uid = 0;

var TreeSelect = (function () {
    _createClass(TreeSelect, null, [{
        key: 'getUniquId',
        value: function getUniquId() {
            return uid++;
        }
    }]);

    function TreeSelect(options) {
        _classCallCheck(this, TreeSelect);

        var self = this;

        var defaultOptions = {
            valueKey: 'id'
        };
        self.options = options = $.extend(defaultOptions, options);
        var uid = TreeSelect.getUniquId();
        var tpl = '\n            <input type="text" class="form-control treeSelect-input "/>\n             <div class="ztree treeSelect-panel" id="treeSelect_panel_' + uid + '"></div>\n        ';
        var ele = $(options.element);
        ele.html(tpl);
        var input = ele.find('.treeSelect-input');
        var panel = ele.find('.treeSelect-panel');
        self.element = ele;
        self.input = input;
        self.panel = panel;
        ele.css({
            'position': 'relative'
        });
        input.on('keydown', function () {

            //input.val(self.text);
            return false;
        });
        input.click(function () {
            if (!self.isOpen()) {
                self.open();
            } else {
                self.close();
            }
        });
        if (options.url) {
            $.ajax({
                type: options.type,
                url: options.url,
                dataType: 'json',
                data: options.param,
                sucess: function sucess(data) {
                    self.render(data);
                }
            });
        } else if (options.data) {
            self.render(options.data);
        }
    }

    _createClass(TreeSelect, [{
        key: 'isOpen',
        value: function isOpen() {
            var panel = this.panel;
            return !(panel.css('display') == 'none' || panel.height() == 0 || panel.css('opacity') == 0);
        }
    }, {
        key: 'render',
        value: function render(data) {
            var self = this;
            var panel = self.panel;
            var setting = {
                check: {
                    enable: true,
                    chkboxType: {
                        "Y": "",
                        "N": ""
                    }
                },
                callback: {
                    onClick: function onClick(event, treeId, treeNode) {
                        if (!treeNode.isParent) {
                            self.input.val(treeNode.name);
                            self.value = treeNode[self.options.valueKey];
                            self.text = treeNode.name;
                            self.close();
                        }
                    },
                    onCheck: function onCheck(e, treeId, treeNode) {

                       debugger;

                    }
                }
            };
            self.ztree = $.fn.zTree.init(panel, setting, data);
        }
    }, {
        key: 'open',
        value: function open() {
            var self = this;
            var panel = self.panel;
            panel.css({
                height: 'auto',
                opacity: 1
            });
            panel.show();
            self.mask = $('<div class="treeSelect-mask"></div>');
            $('body').append(self.mask);
            self.mask.click(function () {
                self.close();
            });
        }
    }, {
        key: 'close',
        value: function close() {

            var self = this;
            //panel.animate({
            //    height:0,
            //    opacity:0
            //},500);
            self.panel.hide();
            self.mask.remove();
        }
    }]);

    return TreeSelect;
})();

//# sourceMappingURL=treeSelect.js.map