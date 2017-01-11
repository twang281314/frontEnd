/**
 * ui-choose通用选择插件
 * 基于jQuery
 */
; + function($) {
    "use strict";
    // 默认实例化配置
    var defaults = {
        itemWidth: null,
        skin: '',
        multi: false,
        active: 'selected',
        full: false, //choose的宽度，默认为null将自动获取choose的宽度；
        colNum: null, // 每行显示的个数
        dataKey: 'ui-choose', //实例化后的data键值，方便后续通过data('ui-choose')取出；
        change: null, //choose值改变时的回调；
        click: null //choose元素点击时的回调，diabled时不发生。
    };
    /**
     * ui-choose插件
     */
    $.fn.ui_choose = function(options) {
        var _this = $(this),
            _num = _this.length;
        // 当要实例的对象只有一个时，直接实例化返回对象；
        if (_num === 1) {
            return new UI_choose(_this, options);
        };
        // 当要实例的对象有多个时，循环实例化，不返回对象；
        if (_num > 1) {
            _this.each(function(index, el) {
                new UI_choose($(el), options);
            })
        }
        // 当元素个数为0时，不执行实例化。
    };

    /**
     * UI_choose对象
     * @param {[jQuery]} el  [jQuery选择后的对象，此处传入的为单个元素]
     * @param {[object]} opt [设置的参数]
     */
    function UI_choose(el, opt) {
        this.el = el;
        this._tag = this.el.prop('tagName').toLowerCase();
        this._opt = $.extend({}, defaults, opt);

        return this._init();
    }

    // UI_choose 原型链扩展。
    UI_choose.prototype = {

        // init初始化;
        _init: function() {
            var _data = this.el.data(this._opt.dataKey);
            // 如果已经实例化了，则直接返回
            if (_data)
                return _data;
            else
                this.el.data(this._opt.dataKey, this);

            // 设置是否多选
            if (this._tag == 'select') {
                this.multi = this.el.prop('multiple');
            } else {
                this.multi = this.el.attr('multiple') ? !!this.el.attr('multiple') : this._opt.multi;
            }

            // 根据不同的标签进行不同的元素组建
            var _setFunc = this['_setHtml_' + this._tag];
            if (_setFunc) {
                _setFunc.call(this);
            }
            if (this._opt.full) {
                this._wrap.addClass('choose-flex');
            }
            this._wrap.addClass(this._opt.skin);
            if (this.multi && !this._opt.skin)
                this._wrap.addClass('choose-type-right');
            this._bindEvent(); // 绑定事件
        },

        // 组建并获取相关的dom元素-ul;
        _setHtml_ul: function() {
            this._wrap = this.el;
            this._items = this.el.children('li');
            if (this._opt.itemWidth) {
                this._items.css('width', this._opt.itemWidth);
            }
        },

        // 组建并获取相关的dom元素-select;
        _setHtml_select: function() {
            var _ohtml = '<ul class="ui-choose">';
            this.el.find('option').each(function(index, el) {
                var _this = $(el),
                    _text = _this.text(),
                    _value = _this.prop('value'),
                    _selected = _this.prop('selected') ? 'selected' : '',
                    _disabled = _this.prop('disabled') ? ' disabled' : '';
                _ohtml += '<li title="' + _text + '" data-value="' + _value + '" class="' + _selected + _disabled + '">' + _text + '</li> ';
            });
            _ohtml += '</ul>';
            this.el.after(_ohtml);

            this._wrap = this.el.next('ul.ui-choose');
            this._items = this._wrap.children('li');
            if (this._opt.itemWidth) {
                this._items.css('width', this._opt.itemWidth);
            }
            this.el.hide();
        },

        // 绑定事件；
        _bindEvent: function() {
            var _this = this;
            _this._wrap.on('click', 'li', function() {
                var _self = $(this);
                if (_self.hasClass('disabled'))
                    return;

                if (!_this.multi) { // single select
                    var _val = _self.attr('data-value') || _self.index();
                    _this.val(_val);
                    _this._triggerClick(_val, _self);
                } else { // multiple
                    _self.toggleClass(_this._opt.active);
                    var _val = [];
                    _this._items.each(function(index, el) {
                        var _el = $(this);
                        if (_el.hasClass(_this._opt.active)) {
                            var _valOrIndex = _this._tag == 'select' ? _el.attr('data-value') : _el.index();
                            _val.push(_valOrIndex);
                        }
                    });
                    _this.val(_val);
                    _this._triggerClick(_val, _self);
                }
            });
            return _this;
        },

        // change 触发；value：值 ；item：选中的option；
        _triggerChange: function(value, item) {
            item = item || this._wrap;
            this.change(value, item);
            if (typeof this._opt.change == 'function')
                this._opt.change.call(this, value, item);
        },

        // click 触发；value：值 ；item：选中的option；
        _triggerClick: function(value, item) {
            this.click(value, item);
            if (typeof this._opt.click == 'function')
                this._opt.click.call(this, value, item);
        },

        // 获取或设置值:select
        _val_select: function(value) {
            // getValue
            if (arguments.length === 0) {
                return this.el.val();
            }
            // setValue
            var _oValue = this.el.val();
            if (!this.multi) { // single select
                var _selectedItem = this._wrap.children('li[data-value="' + value + '"]');
                if (!_selectedItem.length)
                    return this;
                this.el.val(value);
                _selectedItem.addClass(this._opt.active).siblings('li').removeClass(this._opt.active);
                if (value !== _oValue) {
                    this._triggerChange(value);
                }
            } else { // multiple select
                if (value == null || value == '' || value == []) {
                    this.el.val(null);
                    this._items.removeClass(this._opt.active);
                } else {
                    value = typeof value == 'object' ? value : [value];
                    this.el.val(value);
                    this._items.removeClass(this._opt.active);
                    for (var i in value) {
                        var _v = value[i];
                        this._wrap.children('li[data-value="' + _v + '"]').addClass(this._opt.active);
                    }
                }
                if (value !== _oValue) {
                    this._triggerChange(value);
                }
            }
            // multiple
            return this;
        },

        // 获取或设置值:ul
        _val_ul: function(index) {
            // getValue
            if (arguments.length === 0) {
                var _oActive = this._wrap.children('li.' + this._opt.active);
                if (!this.multi) { // single select
                    return _oActive.index() == -1 ? null : _oActive.index();
                } else { // single select
                    if (_oActive.length == 0) {
                        return null;
                    }
                    var _this = this,
                        _val = [];
                    _oActive.each(function(index, el) {
                        var _el = $(el);
                        if (_el.hasClass(_this._opt.active)) {
                            _val.push(_el.index());
                        }
                    });
                    return _val;
                }
            }
            // setValue
            var _oIndex = this._val_ul();
            if (!this.multi) { // single select
                var _selectedItem = this._wrap.children('li').eq(index);
                if (!_selectedItem.length)
                    return this;
                _selectedItem.addClass(this._opt.active).siblings('li').removeClass(this._opt.active);
                if (index !== _oIndex) {
                    this._triggerChange(index, _selectedItem);
                }
            } else { // multiple select
                if (index == null || index == '' || index == []) {
                    this._items.removeClass(this._opt.active);
                } else {
                    index = typeof index == 'object' ? index : [index];
                    this._items.removeClass(this._opt.active);
                    for (var i in index) {
                        var _no = index[i];
                        this._wrap.children('li').eq(_no).addClass(this._opt.active);
                    }
                }
                if (index !== _oIndex) {
                    this._triggerChange(index);
                }
            }
            // multiple
            return this;
        },


        // 获取或设置值
        val: function() {
            return this['_val_' + this._tag].apply(this, arguments);
            // ul
            /*var _oIndex = this._wrap.children('li.' + this._opt.active).index();
            if (arguments.length === 0) {
                return _oIndex == -1 ? null : _oIndex;
            }
            var _nItem = this._items.eq(valueOrIndex);
            if (this._tag == 'select') {
                _nItem = this._wrap.find('li[data-value="' + valueOrIndex + '"]');
                this.el.val(valueOrIndex);
            }

            if (valueOrIndex === null) {
                if (this.val() !== valueOrIndex)
                    this._triggerChange(valueOrIndex);
                this._items.removeClass(this._opt.active);
                return;
            }
            // if (valueOrIndex < this._items.length && _nItem.length > 0) {
            if (this.multi) {
                _nItem.toggleClass(this._opt.active);
            } else {
                _nItem.addClass(this._opt.active).siblings('li').removeClass(this._opt.active);
            }
            if (this._tag == 'select') {
                _oIndex = _oValue;
            }
            _oIndex != valueOrIndex ? this._triggerChange(valueOrIndex, _nItem) : null;
            // }*/
        },

        // 值改变事件；
        change: function(value, item) {},

        // 点击事件；
        click: function(value, item) {},

        // 隐藏
        hide: function() {
            this._wrap.hide();
            return this;
        },

        // 显示
        show: function() {
            this._wrap.show();
            return this;
        }
    };
}(jQuery);