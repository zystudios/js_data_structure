

/*
判断链表有环，用快慢指针

慢指针一次一步，快指针一次2步，如果有环，一定会相遇

如果没有环，那么next肯定会有null，遍历到null了，还没相遇，那就是无环
*/

var hasCycle = function(head) {
    let slow = head;
    let fast = head;
    while(fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) {
            return true;
        }
    }
    return false;
};

