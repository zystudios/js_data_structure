/*
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

 

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

*/

/*【解法一】暴力遍历 + Set
最快想到的就是暴力遍历，以每个字符串为开头遍历一遍
创建一个set，遍历的时候，每个字符添加set，如果发现已经存在了，就退出循环，计算一下长度
*/

function lengthOfLongestSubstring(s) {
  let len = s.length;
  let result = 0;

  for (let i = 0; i < len; i++) {
    let set = new Set();
    let maxLen = 0;
    // 从i的位置遍历得到最长子串的长度
    let j = i;
    while (j < len && !set.has(s[j])) {
      set.add(s[j]);
      maxLen++;
      j++;
    }
    // 取历史最大值
    result = Math.max(result, maxLen);
  }
  return result;
}

// 滑动窗口

const lengthOfLongestSubstring = s => {
    // 滑动窗口初始化为一个空数组
    let arr = [];
    // 要返回的字符串的长度
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        // 使用 indexOf 判断是否在数组中出现过
        let index = arr.indexOf(s[i]);
        // 如果出现过
        if (index !== -1) {
            // 从数组开头到 第一个发现重复字符的地方都删掉
            arr.splice(0, index + 1);
        }
        // 在窗口右边放进新的字符
        arr.push(s[i]);
        // 更新下最大值
        max = Math.max(arr.length, max);
    }
    // 返回
    return max;
};

