/*
先序遍历，头左右的顺序，如果某个节点是null，用一个特殊符合代替

*/

var serialize = function (root) {
    const res = [];
    preOrder(root);
    return res.join('_');
    function preOrder(root) {
        if (root == null) {
            res.push('#');
            return;
        }
        res.push(root.val);
        preOrder(root.left);
        preOrder(root.right);
    }
};


var deserialize = function (data) {
   // const data1 = serialize(data);
    der(data.split('_'));
    function der(data) {
        if (!data.length) return null;
        let first = data.shift();
        if (first == '#') return null;
        let root = new TreeNode(first);
        root.left = der(data);
        root.right = der(data);
        return root;
    }
};


/*
递归
*/

function serialize(root) {
    if (root == null) {
        // 遍历到 null 节点 #表示
        return '#';
    }
    const left = serialize(root.left); // 左子树的序列化结果
    const right = serialize(root.right); // 右子树的序列化结果
    return root.val + '_' + left + '_' + right; // 按  根,左,右  拼接字符串
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data) {
    const list = data.split('_'); // split成数组

    const buildTree = list => {
        // 基于list构建当前子树
        const rootVal = list.shift(); // 弹出首项，获取它的“数据”
        if (rootVal == '#') {
            // 是X，返回null节点
            return null;
        }
        const root = new TreeNode(rootVal); // 不是X，则创建节点
        root.left = buildTree(list); // 递归构建左子树
        root.right = buildTree(list); // 递归构建右子树
        return root; // 返回当前构建好的root
    };

    return buildTree(list); // 构建的入口
}
