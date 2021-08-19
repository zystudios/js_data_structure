/*

22. 括号生成
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

有效括号组合需满足：左括号必须以正确的顺序闭合。



示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
*/

var generateParenthesis = function (n) {
    if (n < 1) return [];
    let res = [];

    // 判断一个组合是否有效
    function valid(arr) {
        //b表示 有多少个左括号
        let b = 0,
            i = 0;
        for (; i < arr.length; i++) {
            if (arr[i] === '(') {
                b++; //发现一个左括号，++
            } else {
                b--; //发现一个右括号，--。
            }

            //这个意思就表示，最后b==0 表示左右括号配对了
            // b < 0 代表前边多一个 ) 肯定没法闭合了
            //因为我是以左括号开始判断的，有多少个左括号最后就要有多少个右括号对应
            //如果遍历过程中，发现右括号已经不对了，就不用遍历了，直接退出
            if (b < 0) return false;
        }
        // b < 0 表示右括号多
        // b> 0 表示左括号多

        return b === 0;
    }

    function generateAll(cur, pos) {
        cur = [...cur];
        // 这里是深拷贝，避免因为引用导致出错
        if (pos === cur.length) {
            if (valid(cur)) {
                res.push(cur.join(''));
            }
        } else {
            let l1 = [...cur];
            l1[pos] = '(';
            generateAll(l1, pos + 1);
            // 按照左括号，开始递归,也就是插入一个左括号
            //也就是最终【（（（（（（ 】

            let r1 = [...cur];
            r1[pos] = ')';
            // 按照右括号，开始递归，看看吧pos+1的位置换成右括号，是不是配对
            generateAll(r1, pos + 1);
        }
    }

    // 括号成对的，所以是2n
    generateAll(Array(n * 2), 0);
    return res;
};





/*
优化
其实不用每次比较，递归时，记录 两种括号的数量即可，必须 如果 ） 的数量大于 （ 的数量，或者 left数量大于n个 直接return 避免多余的运算
*/

var generateParenthesis = function (n) {
    if (n < 1) return []
    let res = [];

    function generateAll(cur, pos) {
      if (cur.left > n || cur.right > cur.left) {
        return;
      }
      if (pos === cur.length) {
        res.push(cur)
      } else {
        let l1 = {...cur};
        l1[pos] = '(';
        l1.left++;
        generateAll(l1, pos + 1);

        let r1 = {...cur}
        r1[pos] = ')';
        r1.right++;
        generateAll(r1, pos + 1);
      }
    }
     // 改一下格式，记录下左括号的数量，和右括号数量
    generateAll({length: 2 * n, left : 0, right: 0}, 0);

    return res.map(e => Array.from(e).join(""))
  };
