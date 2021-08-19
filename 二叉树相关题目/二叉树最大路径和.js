/*
124. 二叉树中的最大路径和
路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。


补充下path大概意思: 给定一个非空二叉树,任意选择两个节点(可以是同一个节点),两个节点必然可以通过一个路径连接,计算该路径上所有节点(包括这两个节点)的val值和.返回其中的最大值。

*/

/*
分析： 3种情况 123,4不是路径 忽略

题目所说的二叉树中的路径可以分为以下四种：
1.单一结点
2.某个结点及其左子树组成路径
3.某个结点及其右子树组成路径
4.某个结点及其左右子树组成的路径

要注意其中类型4的路径是无法作为子路径返回给上一级结点的，否则形成的就不是路径（只有惟一的起点和终点）而是树了


树的后序遍历，每次遍历到根节点，就计算一次路径最大值
每个根节点处的路径选择有上面四种情况：
*/
var maxPathSum = function(root) {
    let max = Number.MIN_VALUE;
     // 先设置一个系统最小值给max

    // 求解最大贡献值的函数
    function gain(node){
        if(!node) return null;

        // 分别计算左右孩子的最大贡献值，为负时则不选用该子节点
        let left = Math.max(0,gain(node.left));
        let right = Math.max(0,gain(node.right));

        // 后续遍历
        // node节点 + node的左右子树 组成的子树中，最大路径和
        let pointMaxSum = node.val + left + right;

        // 如果这条路径的路径和大于原答案，则更新答案
        max = Math.max(pointMaxSum,max);

        // 返回节点贡献值
        return Math.max(left,right) + node.val
    };
    gain(root);
    return max;
};



/*

下面是比较笨的办法

求出包含根节点的整个树最大路径res，然后去递归判断它的左孩子节点和右孩子节点，这样一直递归就可以比较包含每一个节点的最大路径
*/

var maxPathSum = function(root) {
    //如果没有孩子节点，则只能是自身
    if (!root.left && !root.right) return root.val
    //max是dfs函数中改变的值，rel是从左孩子节点出发的最大路径，rer是从右孩子节点出发的最大路径
    let max = 0, rel = 0, rer = 0
    //dfs函数是求从某个节点出发的最大路径，每次更新max值
    const dfs = (root, cur) => {
        //如果当前路径大于最大了，更新
        max = Math.max(cur, max)
        //已经到叶子结点没法走下去了，返回
        if (!root.left && !root.right) return
        //有孩子节点，递归遍历，寻找可能的更大的max值
        if (root.left) dfs(root.left, cur + root.left.val)
        if (root.right) dfs(root.right, cur + root.right.val)
    }
    //如果根节点有左孩子，则求出左孩子出发的最大路径
    if (root.left) {
        dfs(root.left, root.left.val)
        rel = max
        max = 0
    }
    //同理
    if (root.right) {
        dfs(root.right, root.right.val)
        rer = max
    }
    //包含根节点的最大路径
    //就是沿着左孩子节点的最大路径（负数的话不如不走，置为0），走到左孩子（第一个加数），然后走到根节点（第二个加数），再往右走
    //这样一定包含根节点，而且路径最大
    let res = Math.max(rel, 0) + root.val + Math.max(rer, 0)
    //然后递归判断，是包含根节点的最大路径更大，还是包含左孩子节点或者右孩子节点的最大路径更大？这样一直递归就能全部判断所有节点
    //注意有可能没有左孩子或者没有右孩子，三元运算符判断一下
    return Math.max(res, root.left ? maxPathSum(root.left) : res, root.right ? maxPathSum(root.right) : res)
};
