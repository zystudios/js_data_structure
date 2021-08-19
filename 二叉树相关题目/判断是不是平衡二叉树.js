/*
110. 平衡二叉树
给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

*/



/*
递归出口：当前树为空，那么这个子树肯定是平衡二叉树，return true
若当前树不为空，将当前树是否是平衡二叉树返回上一级
判断当前树是否是平衡二叉树：
（1）左右节点高度差不超过1，（2）左子树是平衡二叉树，（3）右子树是平衡二叉树



*/



// 获取当前节点高度的递归函数
const getH = root => {
    if (!root) return 0;
    // 返回左右节点的最大高度+1,（+1:根节点）
    return Math.max(getH(root.left), getH(root.right)) + 1;
};

const isBalanced = root => {
    // 能递归到达这里，这个子树肯定是平衡二叉树
    if (!root) return true;
    // 平衡二叉树的条件：
    return (
        // 1. 根节点的左右节点高度差不超过1
        Math.abs(getH(root.left) - getH(root.right)) <= 1 &&
        // 2. 左子树是平衡二叉树
        isBalanced(root.left) &&
        // 3. 右子树是平衡二叉树
        isBalanced(root.right)
    );
};
