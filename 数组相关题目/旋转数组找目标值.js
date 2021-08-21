/*

整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

 

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

// 解法一，遍历数组，比较返回，复杂度On

// 解法2 二分法，时间复杂度：O(logn)  空间复杂度：O(1)

var search = function (nums, target) {
  if (nums.length == 0) {
    return -1;
  }
  if (nums.length == 1) {
    return nums[0] == target ? 0 : -1;
  }
  // 二分法，左右边界
  var left = 0,
    right = nums.length - 1;
  while (left < right) {
    var mid = parseInt((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
      // 若 nums[mid] === target，直接返回mid
    } else {
      // 若 nums[left] <= nums[mid]，说明左边部分是升序的
      if (nums[left] <= nums[mid]) {
        /*
                若 nums[left] <= target && target <= nums[mid]，说明target在升序这部分里面，
                那么 right = mid - 1 缩小范围
                否则 left = mid + 1 缩小范围

                */
        if (nums[left] <= target && target <= nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        // 若是右边部分升序的
        /*
        若 nums[mid] <= target && target <= nums[right]
        说明target在升序这部分里面，那么 left = mid + 1 缩小范围
        否则 right = mid - 1 缩小范围                
        */
        if (nums[mid + 1] <= target && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
  }
  //最后 left === right 跳出循环，则判断是否等于target： nums[left] === target ? left : -1
  return nums[left] === target ? left : -1;
};
