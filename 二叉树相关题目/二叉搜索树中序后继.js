/*

285. 二叉搜索树中的中序后继
给定一棵二叉搜索树和其中的一个节点 p ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 null 。

节点 p 的后继是值比 p.val 大的节点中键值最小的节点。



*/

/*
解题思路
后继节点考虑两种可能

  1  后继节点是右子树的最小结点
  2  后继节点是父节点

  流程是先找到结点,无右结点则返回null，否则找到右结点上的最小值（实际就是在左数上）

  每一个二叉树，他的左子树的节点都比他根节点小，右子树的所有节点都比他根节点大
*/

var inorderSuccessor = function(root, p) {
    if (root.val > p.val) { // 根据搜索二叉树特点，根节点大，所以p在左子树
       // 递归遍历左子树
        return inorderSuccessor(root.left, p) || root
    }
    if (root.val < p.val) {// 根据搜索二叉树特点，根节点小 p在右子树
        //遍历右子树
        return inorderSuccessor(root.right, p)
    }

    if (root.val == p.val) {// 找到p结点
        //因为题目是要找中序后继，如果右节点不存在，返回null

       // 因为题目是节点 p 的后继是值比 p.val 大的节点中键值最小的节点。
       // 因为比p大，所以必定是在右子树
        if (!root.right) return null
        let cur = root.right
        // 所以，在右子树的左树上遍历，找最小的节点，因为左数的节点都比头结点要小
        // 这里就不能在右子树上找，因为右子树大
        while (cur.left) {
            cur = cur.left
        }
        return cur
    }
};
