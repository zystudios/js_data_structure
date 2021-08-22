/*
方法1 ，新建一个链表
两个指针，分别遍历l1，l2，判断大小，数值加入新链表
*/

var mergeTwoLists = function(l1, l2) {
    let l3 = new ListNode();
    res = l3;
    while(l1 && l2) {
        if(l1.val <= l2.val) {
            // [l1.next,l2] = [l2,l1.next]
            l3.next = l1;
            l1 = l1.next;
        }else {
            l3.next = l2;
            l2 = l2.next;
        }
        l3 = l3.next;
    }
    if(l1) l3.next = l1;
    if(l2) l3.next = l2;
    return res.next;
};





/*
递归

递归，先判结束条件，如果l1为空，返回l2；反之亦然

特判：如果有一个链表为空，返回另一个链表
如果l1节点值比l2小，下一个节点应该是l1，应该return l1，在return之前，指定l1的下一个节点应该是l1.next和l2俩链表的合并后的头结点
如果l1节点值比l2大，下一个节点应该是l2，应该return l2，在return之前，指定l2的下一个节点应该是l1和l2.next俩链表的合并后的头结点

时间复杂度：O(m + n) 
空间复杂度：O(m + n) 


*/



var mergeTwoLists = function (l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;


  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
