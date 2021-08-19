/*

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。



*/



// 看了提示，可以用哈希表加快速度，之前循环花了300多毫秒，我们再试试
var twoSum = function(nums, target) {

    var map = new Map();
    // 先把数组存入哈希
    nums.forEach(function(value,index){
    // key 是具体的数值，value就是下标index
        map.set(value,index);
    })

   for (var i = 0; i < nums.length;i++){

        var temp = target - nums[i];
        // 其实这里就是替代数组的indexOf方式
         if(map.get(temp) && map.get(temp)  != i  ){
           return [i,map.get(temp)];
          }
   }




};