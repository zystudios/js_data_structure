/*
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // 定义一个和，定义一个最大数，初始化的时候，sum是数组第一个数
    let sum = nums[0];
    let max = sum;

    // 如果要找出这个数组，用俩变量，记录子数组的开头结尾下标
    let start = 1;
    let maxstart = 1
    let maxend = 1;

    for (let i = 1; i < nums.length; i++) {
        // 遍历，首先，最大和，那么如果是负数的话，肯定是越加越小，如果遇到了负数，就把sum赋值为这个数
        if (sum <= 0) {
            sum = nums[i];

            // 这里要记录每次开头的位置
            start = i;
        } else {
            // 否则，是正数的话，就一直累加
            sum += nums[i];
        }
        // 只有当前的数值，大于max了，才会记录结束位置，因为前面一直是累加的
        if(sum > max){
            maxstart = start;
            maxend = i;
        }
        // 每次计算一下，当前的累加结果，和最大max比，谁大，max记录的就是上一次累加的结果
        max = Math.max(sum, max);
    }

    return max;
};
