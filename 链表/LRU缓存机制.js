/*

146. LRU 缓存机制
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
实现 LRUCache 类：

LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

*/

// 这个类似哈希表，但是，哈希表是无序的，就是不会记录访问的顺序，需要改造
// 所以整体就是，哈希表配合双向链表，哈希表负责存储，读取，因为哈希表的存储读取是o1的
// 双向链表主要是为了记录顺序，越是最近使用的，在链表的前面，

/*

思路
    数据被读取了，就是被使用了，所在的位置要刷新，浮到“顶部”。
写入数据时：
    之前就有的，更新数据，刷新位置。
    之前没有的，有位置就直接写入，没有位置，就先删掉最久没有使用的条目，再写入。
    要求 get 和 put 为 O(1)，这俩操作都可能导致条目的移动，这包含删除操作，所以删除操作也要是 O(1)O(1)。
选择什么数据结构？
    O(1)  的快速查找，就哈希表了。
光靠哈希表可以吗？
    哈希表是无序的，无法知道里面键值对哪些最近访问过，哪些很久没访问。
快速删除，谁合适？
    数组？元素的插入和移动是 O(n)，删除元素也是 O(n)。不行。
    单向链表？删除节点需要访问前驱节点，只能花 O(n) 从前遍历查找。不行。
    双向链表，结点有前驱指针，删除和移动节点都是指针的变动，都是 O(1)。
双向链表、哈希表，怎么配合？
    链表结点：存 key 和 对应的数据值。
    哈希表的存在是为了：快速访问【存储于双向链表的数据】
    key：存双向链表中存的 key
    value：存链表结点的引用。

*/

//双向链表结构图
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}





//dummyHead dummyTail虚拟头尾节点，不存数据，只是为了让真实头尾节点的操作，和其他节点一致，方便快速访问头尾节点。
//初始还没有添加真实节点，要将虚拟头尾节点联结在一起。

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity; // 缓存的容量
        this.hash = {}; // 哈希表
        this.count = 0; // 缓存数目
        this.dummyHead = new ListNode(); // 虚拟头结点
        this.dummyTail = new ListNode(); // 虚拟尾节点
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead; // 相联系
    }


    //get: 哈希表中找不到对应的值，则返回 -1。被读取的节点，要刷新它的位置，移动到链表头部
    get(key) {
        let node = this.hash[key]; // 从哈希表中，获取对应的节点
        if (node == null) return -1; // 如果节点不存在，返回-1
        this.moveToHead(node); // 被读取了，该节点移动到链表头部
        return node.value; // 返回出节点值
    }

    /*
    put:
    写入新数据，先检查容量，决定是否删“老家伙”，然后创建新的节点，添加到链表头部(最不优先被淘汰)，映射到哈希表。
    写入已有的数据，则更新数据值，刷新节点的位置。


    */

    put(key, value) {
        let node = this.hash[key]; // 获取链表中的node
        if (node == null) {
            // 不存在于链表，是新数据
            if (this.count == this.capacity) {
                // 容量已满
                this.removeLRUItem(); // 删除最远一次使用的数据
            }
            let newNode = new ListNode(key, value); // 创建新的节点
            this.hash[key] = newNode; // 存入哈希表
            this.addToHead(newNode); // 将节点添加到链表头部
            this.count++; // 缓存数目+1
        } else {
            // 已经存在于链表，老数据
            node.value = value; // 更新value
            this.moveToHead(node); // 将节点移到链表头部
        }
    }

    moveToHead(node) {
        this.removeFromList(node); // 从链表中删除节点
        this.addToHead(node); // 添加到链表的头部
    }
    removeFromList(node) {
        let temp1 = node.prev; // 暂存它的后继节点
        let temp2 = node.next; // 暂存它的前驱节点
        temp1.next = temp2; // 前驱节点的next指向后继节点
        temp2.prev = temp1; // 后继节点的prev指向前驱节点
    }

    addToHead(node) {
        // 插入到虚拟头结点和真实头结点之间
        node.prev = this.dummyHead; // node的prev指针，指向虚拟头结点
        node.next = this.dummyHead.next; // node的next指针，指向原来的真实头结点
        this.dummyHead.next.prev = node; // 原来的真实头结点的prev，指向node
        this.dummyHead.next = node; // 虚拟头结点的next，指向node
    }

    removeLRUItem() {
        // 删除“老家伙”
        let tail = this.popTail(); // 将它从链表尾部删除
        delete this.hash[tail.key]; // 哈希表中也将它删除
        this.count--; // 缓存数目-1
    }
    popTail() {
        // 删除链表尾节点
        let tail = this.dummyTail.prev; // 通过虚拟尾节点找到它
        this.removeFromList(tail); // 删除该真实尾节点
        return tail; // 返回被删除的节点
    }
}
