/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]


*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function (nums) {

    // 先从小到大排序
    var sortnums = nums.sort(function (a, b) {
        return a - b;
    });

    // 因为已经排序了，那么数组第一个如果是0，后面就不可能是负数了
    // 要想和等于0，那么只有一种情况，就是数组前三个数是0
   if(nums[0] == 0 && nums[1] == 0 && nums[2]== 0){
        return [[0,0,0]];
    }


    let leftIndex = 0;
    let rightIndex = 0;
    let resultarr = [];
    let target = 0;

    for (var i = 0; i < sortnums.length; i++) {
        if (sortnums[i] > 0) {
            // 如果有大于0的，那么后面全都是正数，所以肯定和不会为0了，这个很好理解
            break;
        }
        // 思路就是，左右两个指针，左边从数组1开始，右边从数组最后一个开始，向中间移动

         // 如果两个数字相同，我们直接跳到下一个循环。
        if (i > 0 && sortnums[i] == sortnums[i-1]) {
            continue;
        }

        leftIndex = i + 1;
        rightIndex = sortnums.length - 1;

        while (leftIndex < rightIndex) {
            // target 就是当前数，加上左边的，加上右边的
            target = sortnums[i] + sortnums[leftIndex] + sortnums[rightIndex];


            if (target == 0 ) {
                // 如果等于0，先放数组里
                    resultarr.push([sortnums[i],sortnums[leftIndex] , sortnums[rightIndex]]);
                // 这里不能直接break，因为还有可能存在其他情况；

               // 这里是判断，左边的数，和他下一个数是不是相等，相等就向下一个移动
                while(leftIndex < rightIndex &&  sortnums[leftIndex] == sortnums[leftIndex+1]){
                    leftIndex++;
                }
               // 这里是判断，右边的数，和他前一个数是不是相等，相等就向前一个移动
                while(leftIndex < rightIndex &&  sortnums[rightIndex] == sortnums[rightIndex-1])               {
                    rightIndex--;
                }

                // 上面是什么意思？因为数组已经经过排序了，又要找出不同的，因此这里就是相当于去重

                leftIndex ++;
                rightIndex --;

            } else if (target > 0) {
                //目标大于0，说明右边的数大了， 向左移动
                rightIndex--;
            } else {
                // 目标小于0 ，说明左边的数字小了，向右移动
                leftIndex++;
            }
        }
    }

  return resultarr;
};
