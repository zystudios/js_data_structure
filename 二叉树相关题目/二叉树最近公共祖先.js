/*

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”






*/


/*
方法1 先遍历p，把p的所有父节点，一直到根节点，都取出来，存hashmap里

然后，遍历q，每拿到一个父节点，去hashmap看存不存在，如果存在，就是

*/

function test(head ,p ,q){
   var hashmap = new hashmap();
   // 先把根节点放入哈希表，hash表存两个东西，第一个是当前节点，第二个是他父节点
   // head的父节点就是他自己head
   hashmap.add(head,head);
   // 这里开始遍历整个二叉树，把父节点都存入哈希表
   process(head,hashmap);

   //
   var arr =[];
   var currnode = p;
   // 自己等于自己父节点的，只有头结点，所以，这个就表示他不是头结点，（向根节点的路径上）上面还有节点
   while(currnode != hashmap.find(currnode)){
       arr.push(currnode);
       currnode = hashmap.find(currnode);
   }
   arr.push(head);//最后吧根节点放进去
   // 上面这个循环，就吧p的所有父节点，都保存到一个数组了


   // 然后，找q的所有父节点

   currnode = q;
   // 自己等于自己父节点的，只有头结点，所以，这个就表示他不是头结点，（向根节点的路径上）上面还有节点
   while(currnode != hashmap.find(currnode)){

       if(arr.indexOf(currnode) > -1){
           console.log('找到了公共祖先');
           return;
       }
       currnode = hashmap.find(currnode);
   }

}

function process(head,rootMap){

    if(head == null){
        return;
    }
   // 首先，吧头结点放入哈希表，左孩子的父结点就是head，右孩子的父结点就是head
    rootMap.add(head.left,head);
    rootMap.add(head.right,head);
    // 递归,直到遍历完所有的节点
    process(head.left,rootMap);
    process(head.right,rootMap);


}





/*

二叉树后续遍历，顺序是左右头
时间复杂度O(n), 空间复杂度O(n)
*/

var test = function(root, p, q) {
    //根节点不存在，直接返回null
    if (root == null) return null;

    //如果p，q有一个等于根节点，那么返回p或者q，因为这个时候公共祖先肯定是p或者q
    if (root == p || root == q) return root;
    const left = test(root.left, p, q);
    const right = test(root.right, p, q);
    // 递归遍历，这里输出就是后续遍历的顺序

    // 然后判断，如果左孩子和右孩子都存在，说明他们的父节点就是公共祖先

   // 情况1 ：p 可能是q 的最低公共祖先，或者q是p的最低公共祖先
   // 情况2 ：q p 两个不互为公共祖先


    // 情况1的时候，这个判断不可能成立，因为情况1的时候，p q 肯定有一个空，另一个不空，才能是
    // p是q的祖先，或者q是p的祖先

    // 所以，这个成立，就必须是情况2，所以，这个时候，root就是他俩的公共祖先，
    if (left != null && right != null) {
        return root;
    }

    // 都不存在，那么就返回null，说明这个树上面，没有p或者q
    if (left == null && right == null) {
        return null;
    }

    // 哪个（p，q）不为空，返回哪个

    return left == null ? right : left;
};
