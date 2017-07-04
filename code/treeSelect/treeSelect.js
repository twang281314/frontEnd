var uid = 0;
class TreeSelect {
    static getUniquId() {
        return uid++;
    }
    constructor(options) {
        var self = this;

        var defaultOptions = {
            valueKey: 'id'
        }
        self.options = options = $.extend(defaultOptions, options);
        var uid = TreeSelect.getUniquId();
        var tpl = `
            <input type="text" class="form-control treeSelect-input "/>
             <div class="ztree treeSelect-panel" id="treeSelect_panel_${uid}"></div>
        `;
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
                sucess: function (data) {
                    self.render(data);
                }
            })
        } else if (options.data) {
            self.render(options.data);
        }
    }

    isOpen() {
        var panel = this.panel;
        return !(panel.css('display') == 'none' || panel.height() == 0 || panel.css('opacity') == 0)
    }
    render(data) {
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
                onClick: function (event, treeId, treeNode) {
                    if (!treeNode.isParent) {
                        self.input.val(treeNode.name);
                        self.value = treeNode[self.options.valueKey];
                        self.text = treeNode.name;
                        self.close();
                    }
                },
                onCheck: function onCheck(e, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeId),
                        nodes = zTree.getCheckedNodes(true),
                        v = "",
                        k = "";
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        v += nodes[i].name + ",";
                        k += nodes[i].name + ",";
                    }
                    if (v.length > 0) v = v.substring(0, v.length - 1);
                    self.input.val(k);
                }
            }
        };
        self.ztree = $.fn.zTree.init(panel, setting, data);
    }
    open() {
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
        })
    }
    close() {

        var self = this;
        //panel.animate({
        //    height:0,
        //    opacity:0
        //},500);
        self.panel.hide();
        self.mask.remove();
    }

}