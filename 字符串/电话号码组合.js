/*
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

// 三重循环

/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    if(digits.length < 1) return [];
    // digits.length >= 1
    const m = {
        2: ["a", "b", "c"],
        3: ["d", "e", "f"],
        4: ["g", "h", "i"],
        5: ["j", "k", "l"],
        6: ["m", "n", "o"],
        7: ["p", "q", "r", "s"],
        8: ["t", "u", "v"],
        9: ["w", "x", "y", "z"],
    };
    let result = [""];
    for(const d of digits) {
        let temp = [];
        for(const r of result) {
            for(const w of m[d]) {
                temp.push(r + w);
            }
        }
        result = temp;
    }
    return result;
};


//回溯
var letterCombinations = function(digits) {
    const k = digits.length;
    const map = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];
    if(!k) return [];
    if(k === 1) return map[digits].split("");

    const res = [], path = [];
    backtracking(digits, k, 0);
    return res;

    // n就是我们需要遍历的数字，k就是输入数字的个数，a表示遍历几个了

    function backtracking(n, k, a) {
        if(path.length === k) { // 终止条件，当前字母的个数，等于我们需要比较的个数，比如
            // 你输入2个数字，等于2就退出，输入3个数字，等于3就退出
            // 因为排列组合和你的数字个数有关
            res.push(path.join(""));
            return;
        }
        for(const v of map[n[a]]) {
            path.push(v); // 处理
            backtracking(n, k, a + 1);// 递归，注意index+1，一下层要处理下一个数字了
            path.pop();// 回溯，把已经比较完的字母弹出，接着进行下次比较
        }

    }
};