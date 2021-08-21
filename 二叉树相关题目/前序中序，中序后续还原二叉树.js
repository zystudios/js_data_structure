//当二叉树中某个节点仅仅只有一个孩子节点的时候，就无法根据其先序和后序唯一的确定一个二叉树。
//前序与后序都没有明确规定节点间的父子关系

/*
我在先序中找到根节点1，然后找到下一个节点2，将其当作根节点，然后在后续中去找到这个节点2。
根据后序遍历的规则（左右根），那么2节点的前面的就是2节点自己的左孩子和右孩子，2节点和1节点之间的就是1号节点的孩子。
当然，2肯定也是1号节点的孩子节点（可能是左孩子，也可能是右孩子）。
那么，如果2节点和1节点之间没有节点了，那么是不是说明1节点仅仅只有2节点这样一个孩子。

*/


// 二叉树的生成

function NodeTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
// 通过二叉树的前序和中序来还原二叉树

/*

            a
     b            c
 d       e    f         g  


*/

let frontArr = ["a", "b", "d", "e" ,"c", "f", "g"];
let middleArr = ["d", "b", "e", "a", "f", "c", "g"];
let endArr = ["d", "e", "b", "f", "g", "c", "a"];

//原理 ： 先序找到第一个节点，根据先序遍历的规则（根 左 右），所以节点1是根节点。
//然后我们利用中序遍历的规则（左 根 右），只要我们在中序中找到1节点，那么在它的左边和右边的就分别是1节点的左孩子和右孩子了
function restoreTreeByFrontAndMiddle(frontArr, middleArr) {
  // 逻辑判断
  if (
    !frontArr ||
    frontArr.length === 0 ||
    !middleArr ||
    middleArr.length === 0 ||
    frontArr === middleArr
  )
    return null;
  // 获取前序遍历的跟节点, 左子树的长度, 前序左子树，前序右子树， 中序左子树， 中序右子树
  let rootNode = new NodeTree(frontArr[0]),
    index = middleArr.indexOf(frontArr[0]),
    frontArrLeft = frontArr.slice(1, index + 1),
    frontArrRight = frontArr.slice(index + 1, frontArr.length),
    middleArrLeft = middleArr.slice(0, index),
    middleArrRight = middleArr.slice(index + 1, middleArr.length);
  rootNode.left = restoreTreeByFrontAndMiddle(frontArrLeft, middleArrLeft);
  rootNode.right = restoreTreeByFrontAndMiddle(frontArrRight, middleArrRight);
  return rootNode;
}

console.log(restoreTreeByFrontAndMiddle(frontArr, middleArr));

/**
 * 通过中序和后序来还原二叉树
 * @param middleArr
 * @param endArr
 */
function restoreTreeByEndAndMiddle(middleArr, endArr) {
  // 算法的兼容判断
  if (
    !middleArr ||
    middleArr.length === 0 ||
    !endArr ||
    endArr.length === 0 ||
    middleArr === endArr
  )
    return null;
  // 获取后序的最后一个值为根节点, 获取中序的根节点的位置，分割成左右子树; 获取中序的左子树， 右子树， 获取后序的左子树和右子树
  let rootNode = new NodeTree(endArr[endArr.length - 1]),
    index = middleArr.indexOf(endArr[endArr.length - 1]),
    middleArrLeft = middleArr.slice(0, index),
    middleArrRight = middleArr.slice(index + 1, middleArr.length),
    endArrLeft = endArr.slice(0, index),
    endArrRight = endArr.slice(index, endArr.length - 1);
  rootNode.left = restoreTreeByEndAndMiddle(middleArrLeft, endArrLeft);
  rootNode.right = restoreTreeByEndAndMiddle(middleArrRight, endArrRight);
  return rootNode;
}

console.log(restoreTreeByEndAndMiddle(middleArr, endArr));
