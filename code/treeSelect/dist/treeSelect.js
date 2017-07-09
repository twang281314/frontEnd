'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var TreeSelect = function () {
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
            valueKey: 'id',
            isShowInput: true,
            selectedIds: '',
            onlyChooseThreeLevel: false
        };
        self.options = options = $.extend(defaultOptions, options);
        var uid = TreeSelect.getUniquId();
        var tpl = '\n            <input type="text" class="form-control treeSelect-input "/>\n             <div class="ztree treeSelect-panel" id="treeSelect_panel_' + uid + '"></div>\n        ';
        var ele = $(options.element);
        ele.html(tpl);
        var input = ele.find('.treeSelect-input');
        var panel = ele.find('.treeSelect-panel');
        panel.click(function (event) {
            if (event && event.stopPropagation) event.stopPropagation();else window.event.cancelBubble = true;
            return false;
        });
        self.element = ele;
        self.input = input;
        self.panel = panel;
        ele.css({
            'position': 'relative'
        });
        if (!self.options.isShowInput) {
            input.css('display', 'none');
            self.panel.css('position', 'relative');
        }
        input.on('keydown', function () {

            //input.val(self.text);
            return false;
        });

        input.click(function (event) {
            if (!self.isOpen()) {
                self.open(event);
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
                success: function success(data) {
                    self.render(data);
                },
                error: function error(data) {}
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
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                view: {
                    selectedMulti: false
                },

                callback: {
                    onClick: function onClick(event, treeId, treeNode) {},
                    onCheck: function onCheck(e, treeId, treeNode) {
                        var zTree = $.fn.zTree.getZTreeObj(treeId),
                            nodes = zTree.getCheckedNodes(true),
                            v = "",
                            k = "";
                        for (var i = 0, l = nodes.length; i < l; i++) {
                            if (!nodes[i].isParent) {
                                v += nodes[i].name + ",";
                                k += nodes[i][self.options.valueKey] + ",";
                            }
                        }
                        if (v.length > 0) v = v.substring(0, v.length - 1);
                        if (k.length > 0) k = k.substring(0, k.length - 1);
                        self.input.val(v);
                        self.value = k;
                        self.text = v;
                    }
                }
            };
            //只能选择第三级节点
            if (self.options.onlyChooseThreeLevel) {
                data.forEach(function (itemFrist) {
                    itemFrist.chkDisabled = true;
                    if (itemFrist.children && itemFrist.children.length > 0) {
                        itemFrist.children.forEach(function (itemSecond) {
                            itemSecond.chkDisabled = true;
                        });
                    }
                });
            }
            self.ztree = $.fn.zTree.init(panel, setting, data);
            //设置已经选择的节点
            if (self.options.selectedIds) {
                self.showSelectedNodes(self.options.selectedIds);
            }
            if (!self.options.isShowInput) {
                self.open();
            }
        }
    }, {
        key: 'open',
        value: function open(event) {
            if (event && event.stopPropagation) event.stopPropagation();else window.event.cancelBubble = true;
            var self = this;
            var panel = self.panel;
            panel.css({
                height: 'auto',
                opacity: 1
            });
            panel.show();
            if (self.options.isShowInput) {
                $(document).one("click", function (event) {
                    self.close();
                });
            }
            // self.mask = $('<div class="treeSelect-mask"></div>');
            // if (self.options.isShowInput) {
            //     $('body').append(self.mask);
            // }
            // self.mask.click(function () {
            //     if (self.options.isShowInput) {
            //         self.close();
            //     }
            // })
        }
    }, {
        key: 'close',
        value: function close() {

            var self = this;
            self.panel.hide();
            // self.mask.remove();
        }
        /**
         * 设置选过的节点
         * @param {*} ids 
         */

    }, {
        key: 'showSelectedNodes',
        value: function showSelectedNodes(ids) {
            var idArray = ids.split(',');
            var self = this;
            var tree = self.ztree;
            tree.checkAllNodes(false);
            idArray.forEach(function (id) {
                tree.checkNode(tree.getNodeByParam("id", id, null), true, true);
            });
        }
    }]);

    return TreeSelect;
}();
