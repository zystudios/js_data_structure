/*

双向链表

结构：

双向链表不仅有head指针指向第一个节点，而且有tail指针指向最后一个节点；
每一个节点由三部分组成：item储存数据、prev指向前一个节点、next指向后一个节点；
双向链表的第一个节点的prev指向null；
双向链表的最后一个节点的next指向null；


双向链表常见的操作（方法）：

append（element）：向链表尾部添加一个新的项；
inset（position，element）：向链表的特定位置插入一个新的项；
findNode（position）：获取对应位置的元素；
indexOf（element）：返回元素在链表中的索引，如果链表中没有元素就返回-1；
update（position，element）：修改某个位置的元素；
removeAt（position）：从链表的特定位置移除一项；
isEmpty（）：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false；
size（）：返回链表包含的元素个数，与数组的length属性类似；
toString（）：由于链表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值；
forwardString（）：返回正向遍历节点字符串形式；
backwardString（）：返回反向遍历的节点的字符串形式；

*/

class LinkedNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoubleList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    findNode(index) {
        // 这里是索引，0开始，所以不能等于length
        if (index < 0 || index >= this.length) {
            throw new Error('out of range');
        }
        let currentNode = null;

        // 这里有个小优化，因为双向链表，如果index在前一半就是从头遍历，在后一半就是从尾遍历
        if (index <= this.length / 2) {
            // 头遍历
            currentNode = this.head;
            for (var i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }
        } else {
            // 尾遍历
            currentNode = this.tail;
            for (var i = this.length - 1; i > index; i--) {
                currentNode = currentNode.prev;
            }
        }
        return currentNode;
    }
    // 追加node
    append(element) {
        let item = new LinkedNode(element);

        if (this.head === null) {
            this.head = item;
            this.tail = item;
        } else {
            /*
            如果空链表，直接头尾都是同一个
            如果链表有数据，那么append是追加到最后

            1 追加元素的prev = 链表的tail
            2 链表tail 之前next是null，现在是追加元素
            3 链表的tail 就是最后追加元素
            */
            item.prev = this.tail;
            this.tail.next = item;
            this.tail = item;
        }
        this.length += 1;
    }
    // 任意位置插入
    insert(index, element) {
        if (index < 0 || index >= this.length) {
            throw new Error('out of range');
        }
        let item = new LinkedNode(element);
        // 头部插入 空链表
        if (index === 0 && this.head === null) {
            this.head = item;
            this.tail = item;
            this.length += 1;
            return;
        }
        if (index === 0 && this.head !== null) {
            // 头部插入 且存在数据

            this.head.prev = item;
            item.next = this.head;
            this.head = item;
            this.length += 1;
            return;
        }
        // 尾部插入
        if (index === this.length - 1) {
            this.append(item);
            return;
        }

        // 中间插入
        let tempNode = this.findNode(index);
        let prev = tempNode.prev;
        let next = tempNode;

        prev.next = item;
        item.prev = prev;
        item.next = next;
        next.prev = item;

        this.length += 1;
    }

    remove(index) {
        // 这里的index是按照0开始的
        if (index < 0 || index >= this.length) {
            throw new Error('out of range');
        }

        // 删除头元素
        if (index === 0) {
            // 后一个元素
            let tempNode = this.head.next;
            tempNode.prev = null;
            this.head = tempNode;
            this.length -= 1;
            return;
        }

        // 删除尾元素
        if (index === this.length - 1) {
            // 前一个元素
            let tempNode = this.tail.prev;
            tempNode.next = null;
            this.tail = tempNode;
            this.length -= 1;
            return;
        }
        // 删除中间的元素 a b c，删除b，a的next =c，c的prev = a
        // 找到要删除的元素
        let tempNode = this.findNode(index);
        let prev = tempNode.prev;
        let next = tempNode.next;
        prev.next = next;
        next.prev = prev;
        tempNode.prev = null;
        tempNode.next = null;
        this.length -= 1;
    }
}

let testList = new DoubleList();
testList.append(1);
testList.append(2);
testList.append(3);
testList.append(4);

testList.insert(2, 7);

// console.dir(testList, { depth: null });

let a = '2039876537';
console.time('parseInt');
let b = parseInt(a,10);
console.timeEnd('parseInt');


let c = 2039876537;
console.time('String');
let d = String(c);
console.timeEnd('String');