> 关于数组去重 

-  ES6去重方法

``` js
let arr = [1, 1, 2, 3, '5', 3];
[...new Set(arr)];
// [1, 2, 3, "5"]
```

- 对面字面量

``` js
function keyValueForArray(arr) {
  var obj = Object.create(null),
        i = 0,
      len = 0;
    if (Array.isArray(arr) && arr.length > 0) {
        len = arr.length;
        for (i = 0; i < len; i += 1) {
            obj[arr[i]] = arr[i];
        }
        return Object.values(obj);
    }
    return [];
}
let arr = [1, 1, 2, 3, '5', 3];
keyValueForArray(arr);
// [1, 2, 3, "5"]

``` 

- Array.from 搭配 Set : Array.from方法可以将 Set 结构转为数组。

``` js
let arr = [1, 1, 2, 3, '5', 3];
arr = Array.from(new Set(arr))
// [1, 2, 3, "5"]

```