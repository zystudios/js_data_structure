/*
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

 

示例 1：

输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
示例 2：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

*/

/*
全排列，多一个去重操作
思路是这样，首先我们对数组进行排序，让重复的数字相邻，
然后开始递归（要回溯），如果当前数字跟前一个相同，则跳过。

*/

var permuteUnique = function(nums) {
    let res = [];
    let len = nums.length

    nums.sort((a,b)=>{ //排序
        return a-b
    })
    unique([],0)
    return res

    function unique(arr) {
        if(arr.length == len) res.push([...arr])
        for(let i=0;i<nums.length;i++){
            if(nums[i] == nums[i-1]) continue
            // 如果发现和下一个数字相同，跳过本次循环，避免重复结果,这个是关键，否则就重复了
            arr.push(nums[i])
            nums.splice(i,1)
            console.log(arr,nums)
           // 上面两个，就是每次nums删除一个，arr里面加入这个，然后针对arr来接着找

            /*
            比如，需要排序【1，1，3】
            console.log(arr,nums)
            [ 1 ] [ 1, 3 ]
            [ 1, 1 ] [ 3 ]
            [ 1, 1, 3 ] []
            [ 1, 3 ] [ 1 ]
            [ 1, 3, 1 ] []
            [ 1 ] [ 1, 3 ]
            [ 1, 1 ] [ 3 ]
            [ 1, 1, 3 ] []
            [ 1, 3 ] [ 1 ]
            [ 1, 3, 1 ] []
            [ 3 ] [ 1, 1 ]
            [ 3, 1 ] [ 1 ]
            [ 3, 1, 1 ] []
            [ 3, 1 ] [ 1 ]
            [ 3, 1, 1 ] []
            */
            unique(arr)
            nums.splice(i,0,arr.pop()) // 回溯到上一步，继续查找看有没有
            // splice 从i开始，删除0个元素，然后吧arr的最后一个元素添加进来到i后面
            // 这个实际就是，吧arr元素的最后一个元素，塞到nums的第i个元素后面
        }
    }

};
