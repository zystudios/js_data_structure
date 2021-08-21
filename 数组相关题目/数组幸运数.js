/*
在整数数组中，如果一个整数的出现频次和它的数值大小相等，我们就称这个整数为「幸运数」。

给你一个整数数组 arr，请你从中找出并返回一个幸运数。

如果数组中存在多个幸运数，只需返回 最大 的那个。
如果数组中不含幸运数，则返回 -1 。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-lucky-integer-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * @param {number[]} arr
 * @return {number}
 */
 var findLucky = function (arr) {
    var map = new Map();
    // 遍历数组，将数组中值和对应的数量作为键值对存在map中, key是数字，value是次数
    for (var i = 0, len = arr.length; i < len; i++) {
      map.set(arr[i], map.has(arr[i]) ? map.get(arr[i]) + 1 : 1);
    }
    let ans = [];
    // 找出map中键值对相等的数，放入一个临时数组中
    map.forEach((val, key) => {
      if (val === key) {
        ans.push(key)
      }
    });
    // 按题意返回
    return ans.length === 0 ? -1 : Math.max(...ans);
  };
  
