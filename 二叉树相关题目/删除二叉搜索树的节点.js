/**
450. 删除二叉搜索树中的节点
给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

首先找到需要删除的节点；
如果找到了，删除它。
说明： 要求算法时间复杂度为 O(h)，h 为树的高度。


二叉搜索树
每一个二叉树，他的左子树的节点都比他根节点小，右子树的所有节点都比他根节点大
这个根节点不仅仅是整个数的根节点，也包括子树的根节点
*/

/*

解题思路
因为BST的左子树总是比根节点小，右子树总是比根节点大，所以我们将根节点的值与要删除的 key 值对比，就知道要删除的值大概在哪个位置：
• 相等：要删除的节点就是当前根节点，即递归退出条件
• key更大：则要递归朝右子树去删除
• key更小：则要递归朝左子树去删除
找到要删除后的节点会出现四种情况：
• 待删除的节点左右子树均为空。证明是叶子节点，直接删除即可，即将该节点置为null
• 待删除的节点左子树为空，让待删除节点的右子树替代自己。
• 待删除的节点右子树为空，让待删除节点的左子树替代自己。
• 如果待删除的节点的左右子树都不为空。我们需要找到比当前节点小的最大节点（前驱）[或比当前节点大的最小节点（后继）]，来替换自己.




*/

const deleteNode = function (root, key) {
    if (root == null) return root

    if (root.val > key) {
      // 往左子树找
      root.left = deleteNode(root.left, key)
    } else if (root.val < key) {
      // 往右子树找
      root.right = deleteNode(root.right, key)
    } else {
      // 找到了
      if (!root.left && !root.right) {
        // 待删除的节点左右子树均为空。证明是叶子节点，直接删除即可
        root = null
      } else if (root.left && !root.right) {
        // 待删除的节点右子树为空，让待删除节点的左子树替代自己。
        root = root.left
      } else if (!root.left && root.right) {
        // 待删除的节点左子树为空，让待删除节点的右子树替代自己。
        root = root.right
      } else if (root.left && root.right) {
        // 如果待删除的节点的左右子树都不为空。我们需要找到比当前节点小的最大节点（前驱）来替换自己
        let last = root.left
        while (last.right) {
          last = last.right
        }
        // 最终的last就是比当前节点小的最大节点，将值进行替换
        root.val = last.val
        // 删除该最大节点
        root.left = deleteNode(root.left, last.val)
      }
    }
    return root
  }
