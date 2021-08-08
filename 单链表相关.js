// 单链表

class LinkedNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 链表追加一个数据
  append(data) {
    // 头结点不存在，空链表，那么头节点就是该节点
    // if (this.head === null)  if (this.length === 0) 都可以
    let element = new LinkedNode(data);

    if (this.head === null) {
      this.head = element;
    } else {
      // 链表不为空，先找到最后一个节点，后面追加
      let lastNode = this.findNode(this.length - 1);
      lastNode.next = element;
    }
    // 追加以后，长度要加1
    this.length += 1;
  }

  // 链表插入一个数据，如果是空链表，直接插入就是头节点
  insert(index, data) {
    if (index < 0 || index > this.length) {
      throw new Error("out of range");
    }

    let element = new LinkedNode(data);
    if (this.head === null) {
      this.head = element;
      this.length += 1;
      return;
    }

    if (index === 0) {
      element.next = this.head;
      this.head = element;
      this.length += 1;
      return;
    }
    // 这里不用判断index === length了，因为默认new的node，next就是null，所以就算是结尾插入也没问题
    let currentNode = this.findNode(index - 1);
    element.next = currentNode.next;
    currentNode.next = element;
    this.length += 1;
  }
  // 链表删除一个数据
  delete(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("out of range");
    }

    // 链表空，直接返回
    if (this.head === null) {
      return;
    }

    // 删除头节点
    if (index === 0) {
      this.head = this.head.next;
      this.length -= 1;
      return;
    }

    let prevNode = this.findNode(index - 1);
    // 删除其他节点，上一个节点的next等于当前节点的next，其实就是等于下一个节点
    prevNode.next = this.findNode(index).next;

    this.length -= 1;
  }

  // 链表查找一个数据，根据index
  findNode(index) {
    // 链表查找只能从头节点开始，一直遍历下去

    let currentIndex = index;

    if (index < 0) {
      currentIndex = 0;
    } else if (index >= this.length) {
      currentIndex = this.length;
    }

    let currentNode = this.head;
    for (var i = 0; i < currentIndex; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  // 根据内容返回索引
  indexOf(data) {
    let currentNode = this.head;
    for (var i = 0; i < this.length; i++) {
      if (currentNode.data === data) {
        return i;
      }
      currentNode = currentNode.next;
    }
    return -1;
  }

  // 获取链表的长度
  getListSize() {
    return this.length;
  }
}

// test
let testLink = new LinkedList();
testLink.append("n1");
testLink.append("n2");
testLink.append("n3");
testLink.append("n4");

testLink.insert(3, "n6");
testLink.insert(1, "n7");

testLink.delete(1);
// console.dir(testLink, { depth: 100 });

// 单链表反转，最简单的思路就是，单独创建一个新链表，然后遍历另一个链表，每次取node，头部插入到新链表里去

let oldLink = new LinkedList();
oldLink.append("1");
oldLink.append("2");
oldLink.append("3");
oldLink.append("4");

let newLink = new LinkedList();

for (var i = 0; i < oldLink.length; i++) {
  newLink.insert(0, oldLink.findNode(i).data);
}

//console.dir(newLink, { depth: 100 });

/*
打印两个有序单链表的公共部分

比如 A 1，2，4，6，8
B 0 ，2，3，5，6，7

公共部分就是2，6

原理：
两个指针，一个指A，一个指B
从左到右开始，A和B，哪个值小，哪个指针向后移动，如果相同，打印出来，同时向后移动，直到有一个越界停止
*/

let ALink = new LinkedList();
ALink.append("1");
ALink.append("2");
ALink.append("4");
ALink.append("6");
ALink.append("8");

let BLink = new LinkedList();
BLink.append("0");
BLink.append("2");
BLink.append("3");
BLink.append("5");
BLink.append("6");
BLink.append("7");

var a = ALink.head;
var b = BLink.head;
while (a.next != null && b.next != null) {
  if (a.data < b.data) {
    a = a.next;
  } else if (a.data > b.data) {
    b = b.next;
  } else {
    console.log(a.data);
    a = a.next;
    b = b.next;
  }
}
