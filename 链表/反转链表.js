
/*

方法一
遍历链表，把所有值存入栈

再次遍历链表，每个节点的数值 等于出栈数值

*/

function ReverseList(head)
{
    //把链表的数值存到数组中
    let node = head;
    let ary = [];
    while(node){
        ary.push(node.val)
        node=node.next  //指向下一个结点
    }
    node = head
    while(node){
        node.val = ary.pop();
        // 注意，这里没有改单链表的地址，只是吧数值改了
        node=node.next
    }
    return head
}



/*
头插法，就是每次向头部插入
反转链表的思路：1-2-3-4-5，先将2换到第一个，变为：2-1-3-4-5。
然后将3换到第一个，3-2-1-4-5。
以此类推。其中，p始终指向1，q指向p的下一个，即本轮需要换到第一个的数。
如此列表：
1-2-3-4-5
2-1-3-4-5
3-2-1-4-5
4-3-2-1-5
5-4-3-2-1


*/

var reverseList = function(head) {
    let cur=head // 当前节点
    let prev=null // 当前节点的前一个节点
    // 一次循环是把当前的节点的next指向prev 周而复始
    // 千万不要想着 一次循环是两个节点位置的互换
    // 按照这个去理解null<-1<-2<-3
    while(cur){
        let nextTemp=cur.next // 先保存一下，当前节点后面所有的节点
        cur.next=prev // 当前节点的next指向prev
        prev=cur // 做完上面一步后 把当前的节点设置为prev，这样，前一个节点就是当前节点了，也就是头部插入
        cur=nextTemp // 然后，当前节点等于之前保存的后面所有的节点
    }
    return prev
};
