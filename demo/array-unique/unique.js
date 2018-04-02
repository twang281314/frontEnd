/**
 * [indexOf 检测数组元素位置]
 * @param  {[type]} e [元素]
 */
Array.prototype.indexOf= function(e) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === e) {
      return i;
    }
  }
  return -1;
}
/**
 * [unique 数组唯一]
 */
Array.prototype.unique = function () {
  var self = this;
  // 声明缓存空数组
  var tmp = new Array();
  for (var i = 0, l = self.length; i < l; i++) {
    if (tmp.indexOf(self[i]) === -1) {
      tmp.push(self[i]);
    }
  }
  return tmp;
}