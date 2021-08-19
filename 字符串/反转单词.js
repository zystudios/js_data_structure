/*
给你一个字符串 s ，逐个翻转字符串中的所有 单词 。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。

说明：

输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
翻转后单词间应当仅用一个空格分隔。
翻转后的字符串中不应包含额外的空格。


*/

/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function(s) {

    s+=' ';
    var s1 = '';
    var arr = [];

    for(var i =0; i < s.length; i++){

        if(s[i] != ' '){
            s1+= s[i];
            // 这个就是先分割出来单词，如果不等于空格，就说明是一个单词
        }else{
            //等于空格了，然后看下s1 有没有东西，有东西说明是一个单词，unshift，头部插入数组
            if(s1 !=''){
                arr.unshift(s1);
                s1 = '';
            }

        }
    }

    // 这样，这个数组里面就存了所有单词，单词的顺序是原来顺序的逆序，因为每次头部插入

    return arr.join(' '); // 然后转成字符串，用空格链接

 };


 /*
正则
\b 表示匹配一个单词的开头 或者结束
\w 匹配字母或数字或下划线或汉字 等价于 ‘[A-Za-z0-9_]’
+表示重复多次

所以，\b\w+\b  就表示匹配一个单词

 */

var reverseWords = function(s) {

    var newword = s.match(/\b\w+\b/g); //正则匹配所有所有单词，返回数组
    if(newword.length >=0 ){
        // 如果数组有，就反转，再转字符串
        newword = newword.reverse();
        newword.join(' ');
    }
};
