/*
二叉树节点特点

1 有一个存储父节点
2 有一个存储左节点
3 有一个存储右节点
4 有一个存数据
*/


class BinaryTreeNode {
    constructor(data, left = null, right = null) {
        this.left = left;
        this.right = right;
        this.data = data;
    }
}


class BinaryTree {
    constructor() {
        // 根节点 null
        this.parent = null;
    }
}


/*
 二叉树遍历  递归序
先说说递归序是什么

function f(n){
    //  函数第一次执行进来
    if(n == null){
        return;
    }
    // 函数第一次执行完毕，如果上面成立，就return了，整个结束，如果没有，执行下面

    f(left);

    // 开始进入递归了，这个时候，只有等执行完了，才会回来这里，注意，这个递归完成以后，不会走上面的


    f(right);

    // left执行完毕，开始走这一个right，right执行完毕，他下面没有了整个函数执行完毕

}
*/

//-------------------------------------------------------------------------
/*
先序遍历 （也叫深度优先遍历）

顺序 头 左 右

      1
   2      3
4    5  6   7

所以，先序遍历顺序就是1245367

按照上面递归序

*/

function xianxubianli(head) {
    if (head == null) {
        return;
    }
    console.log('这里输出节点就是先序遍历');
    xianxubianli(head.left);
    xianxubianli(head.right);
}

//-------------------------------------------------------------------------


/*
中序遍历

顺序 左 头 右

      1
   2      3
4    5  6   7

所以，中序遍历顺序就是4251637

按照上面递归序

*/

function zhongxubianli(head) {
    if (head == null) {
        return;
    }
    console.log('这里输出节点就是先序遍历');
    zhongxubianli(head.left);
    console.log('这里输出节点就是中序遍历');
    zhongxubianli(head.right);
}

//-------------------------------------------------------------------------

/*
后序遍历

顺序 左 右 头

      1
   2      3
4    5  6   7

所以，后序遍历顺序就是4526731

按照上面递归序


*/

function houxubianli(head) {
    if (head == null) {
        return;
    }
    console.log('这里输出节点就是先序遍历');
    houxubianli(head.left);
    console.log('这里输出节点就是中序遍历');
    houxubianli(head.right);
    console.log('这里输出节点就是后序遍历');
}

//-------------------------------------------------------------------------


// 非递归，用栈实现

/*
先序遍历非递归

1 准备一个栈，先把根节点入栈
2 从栈中弹出一个节点，打印这个节点
3 把这个节点的右节点先入栈，左节点后入栈
4 循环

2里面打印出来的就是先序遍历的顺序

*/

function xianxubianli_feidigui(head) {

    if (!head) {
        return;
    }

    var zhan = [];
    zhan.push(head);

    while (zhan.lendth > 0) {

        var node = zhan.pop();
        console.log(node); // 这里就是先序遍历的顺序
        zhan.push(node && node.right);
        zhan.push(node && node.left);

    }

}

/*
中序遍历非递归

1 准备一个栈
2 每个子树，先把左边界都入栈
3 弹出节点，每弹出一个，右边界重复2
4 循环

原理：入栈顺序，左头右（右又是先左在右）整体顺序就是左头右

*/

function zhongxubianli_feidigui(head) {

    var zhan = [];
    zhan.push(head);

    while (zhan.length > 0) {
        // 先把左边界都入栈
        while (head && head.left) {
            zhan.push(head.left)
        }
        //弹出
        var node = zhan.pop();
        console.log(node); // 这个打印顺序就是中序遍历的顺序
        // head设置为弹出节点的right，继续重复
        head = node.right;




    }



}

/*
后序遍历 非递归

1 准备一个栈A，先把根节点入栈
2 再准备一个栈B
3 从A栈中弹出一个节点，入栈B
4 把这个节点的左节点先入栈A，右节点后入栈A
5 循环

栈B就是后序遍历，因为入栈B的顺序是头右左，B出站以后，顺序就是左右头，所以就是后序遍历的顺序
*/

function zhongxubianli_feidigui(head) {

    var zhan_a = [];
    var zhan_b = [];
    zhan_a.push(head);

    while (zhan_a.length > 0) {
        var node = zhan_a.pop();
        zhan_b.push(node);
        zhan_a.push(node && node.left);
        zhan_a.push(node && node.right);
    }

    // 栈b里面就是后序遍历的顺序
    while (zhan_b.length > 0) {
        console.log(zhan_b.pop());
    }

}



/*
二叉树宽度优先遍历

或者求一个二叉树的宽度

解法，用队列

1 头结点放队列
2 弹出
3 放左
4 放右
5 循环


*/

function kuandu(head) {
    var duilie = [];
    duilie.push(head);

    while (duilie.length > 0) {

        var node = duilie.shift();
        console.log(node); // 这个打印顺序就是宽度优先的顺序
        duilie.push(node && node.left);
        duilie.push(node && node.right);
    }

}



/*
【判断是不是搜索二叉树】
每一个二叉树，他的左子树的节点都比他根节点小，右子树的所有节点都比他根节点大
这个根节点不仅仅是整个数的根节点，也包括子树的根节点

一个经典的搜索二叉树，我们认为他里面的值都是不重复的，因为要满足大小，不能相等

解法：中序遍历
中序遍历以后，所有的数值是升序状态，那就是搜索二叉树，否则就不是
*/


var max = 0;

function zhongxubianli(head) {
    if (head == null) {
        return;
    }
    zhongxubianli(head.left);
    console.log('这里输出节点就是中序遍历');
    if (head.value > max) {

        max = head.value;

    } else {
        // 不是搜索二叉树
        break;
    }
    zhongxubianli(head.right);
}





/*
判断是不是完全二叉树

完全二叉树：每一层都有左孩子右孩子

1 如果有一个节点 ，只有右孩子 没有左孩子，就不是
2 满足1 如果有一个节点，左孩子或者右孩子有一个为空，那么后续所有节点，不能有左右孩子，否则就不是

解法：按照宽度遍历（前序遍历），

*/


function kuandu(head) {
    var duilie = [];
    duilie.push(head);
    var isleaf = false;

    while (duilie.length > 0) {

        var node = duilie.shift();
        console.log(node); // 这个打印顺序就是宽度优先的顺序

        if (node.left == null && node.right) {
            // 如果左孩子空，右孩子有，肯定不是
            return false;
        }

        if (isleaf && (node.left || node.right)) {
            // 如果已经有一个节点，只有左孩子了，那么后续节点，只要有孩子，就肯定不是
            return false;
        }


        duilie.push(node && node.left);
        duilie.push(node && node.right);

        if (node.left == null || node.right == null) {
            // 如果一个节点，左孩子 右孩子有一个为空，那么，后面所有的节点都不能有孩子
            isleaf = true;
        }

    }

}



/*
判断是不是满二叉树

宽度优先遍历，每个节点都必须有左右孩子，除非他是叶子节点


这里用动态规划解

判断是不是满二叉树，需要两个东西，一个是树高度，一个是数的节点数

如果2的高度次方-1 == 节点数，必然是满二叉树

*/






/*
判断平衡二叉树

任何一个子树，左树和右树高度不超过1

*/



/*
最低公共祖先

二叉树 两个节点向根节点走，哪个点是第一个可以相交的，哪个点就是

解法：这两个节点 各自向上遍历，找出所有父节点

用一个hashmap，存所有的父节点，如果有发现存在了，这个节点就是相交的
*/