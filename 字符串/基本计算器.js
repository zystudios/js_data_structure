/*
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

 

示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23

*/

/*

解题思路
1、遍历字符串
2、对数字或者运算符处理（参考 227 题）
3、碰到左圆括号，用 getRight 函数获取右圆括号，对括号内字符串递归
本质就是最后全部做加法


*/

var calculate = function (s) {
    const stack = [];
    let last = '+', // 先给个+，让他能入栈
        n = 0;// n表示当前的数字
    // 判断是不是+-x/运算符号，如果是就入栈
    function action(char) {
        switch (last) {
            case '+':
                stack.unshift(n);// 加法不变
                break;
            case '-':
                stack.unshift(-n); // 减法 就是变成负数
                break;
            case '*':
                stack.unshift(stack.shift() * n); // 乘法就是x
                break;
            case '/':
                stack.unshift((stack.shift() / n) >> 0);//除法 >> 0 去掉小数
                break;
            default:
                break;
        }
        n = 0;
        last = char;
    }

    // 这个是找出右边第一个匹配的右括号
    function getRight(index) {
        let right = s.indexOf(')', index + 1);
        let left = s.indexOf('(', index + 1);
        while (left !== -1 && left < right) {
            right = s.indexOf(')', right + 1);
            left = s.indexOf('(', left + 1);
        }
        return right;
    }

    // 遍历
    for (let i = 0; i <= s.length; i++) {
        // 如果是空格，就继续读取下一个字符
        if (s[i] === ' ') {
            continue;
        }
        // 如果这个数在0-9之间,如果为数字 对num赋值 (* 10 是处理多位数字情况)
        if (s[i] <= '9' && s[i] >= '0') {
            n = n * 10 + Number(s[i]);
            continue;
        }
        // 碰到左括号，就找右括号在哪里
        if (s[i] === '(') {
            let right = getRight(i);
            // 然后对括号内的表达式递归计算
            n = calculate(s.substring(i + 1, right));
            i = right;
            continue;
        }
        action(s[i]);
    }
    let result = 0;
    for (let num of stack) {
        result += num;
    }
    return result;
};
