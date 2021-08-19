/*

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

 

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
 


*/


// 解法1 数组排序，从大到小，直接返回第k个
let findKthLargest = function(nums, k) {

    if(nums.length == 0 || k > nums.length || k< 0 ){
        return;
    }
    nums.sort((a, b) => b - a);
    num.slice(0, k);
    return nums[k-1]
};


//构造前K个最大元素的小顶堆，堆顶元素即为结果
/*

 堆：特殊的完全二叉树
 所以堆肯定是完全二叉树

 堆，分 大根堆 小根堆

 大根堆：完全二叉树里，每一个节点的子树，他的所有节点都小于这个子树根节点

 小根堆：完全二叉树里，每一个节点的子树，他的所有节点都大于这个子树根节点
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function (nums, k) {
    const heap = [,].concat(nums.slice(0, k));
    // 下标0不使用，填充站位。主要是为了方便，因为数组0开始
    // 保证下标是从1，2，3，4，5，6，7这样的层次顺序，从而才有任意节点[i]的父节点为Math.floor(i/2)
    // console.log("1. heap => ", heap);


    // 交换两个元素
    function swap(arr, i, j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }

    // 堆化，从上向下比较，每个节点都要小于他的孩子
    function heapify(heap) {
      // 初始heap 无序，期望结果：=> heap 被堆化，任意节点都要小于等于<=子节点
      for (let i = 2; i < heap.length; i++) {
        let parent = Math.floor(i / 2); // 父节点下标,这个是公式
        while (heap[i] < heap[parent] && parent > 0) {
            // 要求parent > 0是因为i可能等于1, 此时没有父节点，不用交换
          swap(heap, i, parent);
          i = parent; // 父节点交换后可能还有未堆化的情况，继续循环
          parent = Math.floor(i / 2);
        }
      }
      return heap;
    }

    heapify(heap);

    // 这个时候，就按照从小到大，排好序了前k个元素

   // 上面是，把这个数组，0-k个元素，从小到大排序好了
   // 现在，从k-n，开始遍历，取每一个数组，如果大于堆顶的元素，就参与堆化，找出这个数和前面所有数的最小值
    for (let i = k; i < nums.length; i++) {
      if (nums[i] > heap[1]) {
        heap[1] = nums[i]; // 大于堆顶元素的参与堆化
        heapify(heap);

      }
    }

    // 因为这个堆的长度就是k，而且又是在这个k里面从小到大的排序，所以，这个堆，整个堆化完了就是前k个数的从小到大排序
    // 第一个就是第k个元素的最大值
    // console.log("3. heap => ", heap);

    return heap[1];
  };