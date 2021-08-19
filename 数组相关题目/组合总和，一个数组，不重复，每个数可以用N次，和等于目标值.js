/*
给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。 

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

 

示例 1：

输入: candidates = [2,3,6,7], target = 7 输出: [[7],[2,2,3]]


*/





/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 const combinationSum = (candidates, target) => {
    // 1. 排序
    candidates.sort((a, b) => a - b);

    // 2. 截取 candidates 中小于 target 的数字 ,因为是求和，而且是正整数，大于target肯定不行
    const newArr = [];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i] <= target) {
        newArr.push(candidates[i]);
      } else {
        break;
      }
    }

    // newArr 就是删除了大于target数的排序好的数组

    // 3. 用一个变量保存设置结果
    const result = [];

    // 4. 递归
    const recursion = (path, sum) => {
      // 4.1 如果结果大于目标值，终止
      if (sum > target) {
        return;
      }
      // 4.2 如果结果等于目标值，添加
      if (sum === target) {
        result.push(path.concat());
      }
      // 4.3 每次都从数字中挑选，加入计算中
      for (let i = 0; i < newArr.length; i++) {
        // 4.3.1 设置 path 的最后一个数字，默认为 0
        const lastNumber = path[path.length - 1] || 0;

        // 4.3.2 只有大于等于的数字，我们才进行组合，排除 [2, 3]、[3, 2] 的情况
        if (newArr[i] >= lastNumber) {
          path.push(newArr[i]); // 数组推入
          recursion(path, sum + newArr[i]); // 递归传入
          path.pop(); // 数组推出，方便下次再用
        }
      }
    };
    recursion([], 0);

    // 5. 返回结果
    return result;
  };
