/*
输入：s = "42"
输出：42
解释：加粗的字符串为已经读入的字符，插入符号是当前读取的字符。


输入：s = "   -42"
输出：-42
解释：


输入：s = "4193 with words"
输出：4193

*/
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  var flag = 1; // 正负标志，1正数 -1 负数
  var str = "";
  s = s.trim(); //首先去掉首位空格

  if (s[0] == "+") {
    flag = 1;
    s = s.slice(1);
  } else if (s[0] == "-") {
    flag = -1;
    s = s.slice(1);
  }
  // 先判断第一个是不是符号，如果是，flag保存下，然后去掉这个符号

  for (var i = 0; i < s.length; i++) {
      // 遍历字符串，不等于空格，并且是数字，str保存下来
    if (s[i] != " " && isNaN(s[i]) == false) {
      str += s[i];
    } else {
      break;
    }
  }

  str = str * flag; 
  // 然后看看正负

  if (str > 2147483647) {
    return 2147483647;
  }
  if (str < -2147483648) {
    return -2147483648;
  }
  return str;
};
