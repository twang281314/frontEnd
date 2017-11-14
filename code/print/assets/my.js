
/**
 * 将给定的时间字符串转换成指定格式
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @uses
 *
 *     formatDate('Nov 25, 2016 4:13:20 PM', 'yyyy-MM-dd') => 2016-11-25
 *
 * @param  {string} str 待格式化的时间串儿
 * @param  {string} fmt 要转换成的格式
 * @return {}
 */
function toFormatDate(str,fmt) {
    var date = new Date(str);
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 数字千分位格式化
 * @public
 * @param mixed mVal 数值
 * @param int iAccuracy 小数位精度(默认为2)
 * @return string
 */
function toFormatMoney(mVal, iAccuracy){
    var fTmp = 0.00;//临时变量
    var iFra = 0;//小数部分
    var iInt = 0;//整数部分
    var aBuf = new Array(); //输出缓存
    var bPositive = true; //保存正负值标记(true:正数)
    /**
     * 输出定长字符串，不够补0
     * <li>闭包函数</li>
     * @param int iVal 值
     * @param int iLen 输出的长度
     */
    function funZero(iVal, iLen){
        var sTmp = iVal.toString();
        var sBuf = new Array();
        for(var i=0,iLoop=iLen-sTmp.length; i<iLoop; i++)
            sBuf.push('0');
        sBuf.push(sTmp);
        return sBuf.join('');
    };

    if (typeof(iAccuracy) === 'undefined')
        iAccuracy = 2;
    bPositive = (mVal >= 0);//取出正负号
    fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp);//强制转换为绝对值数浮点
    //所有内容用正数规则处理
    iInt = parseInt(fTmp); //分离整数部分
    iFra = parseInt((fTmp - iInt) * Math.pow(10,iAccuracy) + 0.5); //分离小数部分(四舍五入)

    do{
        aBuf.unshift(funZero(iInt % 1000, 3));
    }while((iInt = parseInt(iInt/1000)));
    // aBuf[0] = parseInt(aBuf[0]).toString();//最高段区去掉前导0
    aBuf[0] = aBuf[0].replace(/^0{1,}/, ''); // 修复 IE8 下 parseInt('012') 兼容问题
    var iFraFinal = '';
    if (0 === iFra) {
        iFraFinal = new Array(iAccuracy + 1).join('0');
    } else {
        iFraFinal = funZero(iFra, iAccuracy);
    }
    return ((bPositive)?'':'-') + aBuf.join(',') +'.'+ iFraFinal;
}

/**
 * 数字金额大写转换（可以处理整数，小数，负数）
 * @param  {integer} n
 * @return {}
 */
function toUpperMoney(n) {
    var fraction = ['角', '分', ' '];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
    var head = n < 0? '欠': '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++)
    {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++)
    {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++)
        {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 基于 layer 的弹窗
 * @param  {object} obj 配置参数
 * @return {}
 */
function alertMsg(obj) {
    var iconIndex = obj.iconIndex ? obj.iconIndex:2;
    var fun = obj.callback ? obj.callback : '';
    var options = {
        title: obj.title || '提示',
        skin: obj.skin || 'layui-layer-lan', //样式类名
        closeBtn: obj.closeBtn || 0,
        scrollbar: false,
        btn: obj.btn || '确定',
        maxWidth: obj.maxWidth,  // area 为 auto 时才生效
        yes: function(index) { // 确定按钮
            layer.close(index);
            if (fun) {
                fun();
            }
        },
        cancel: function(index) { // 右上角取消按钮
            layer.close(index);
            if (fun) {
                fun();
            }
        }
    };
    if (iconIndex) {
        options.icon = iconIndex;
    }
    if (obj.area) {  // 默认 auto 自适应
        options.area = obj.area;
    }
    layer.alert(obj.msg, options, function(index) {
        // if (fun) {
        //     fun();
        // }
        // layer.close(index);
    });
}
