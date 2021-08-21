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
    let element = new LinkedNode(data);

    // 头结点不存在，空链表，那么头节点就是该节点
    // if (this.head === null)  if (this.length === 0) 都可以
    if (this.head === null) {
      this.head = element;
    } else {
      // 如果链表不为空，先找到最后一个节点，后面追加
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
    // 空链表，直接就是头结点
    if (this.head === null) {
      this.head = element;
      this.length += 1;
      return;
    }
    // 0表示头部插入，就把当前节点的next直接设置为头结点,头结点设置为当前节点
    if (index === 0) {
      element.next = this.head;
      this.head = element;
      this.length += 1;
      return;
    }

    //否则，就是直接插入了， 这里不用判断index === length（是不是尾部插入）了，因为默认new的node，next就是null，所以就算是结尾插入也没问题
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
    // 删除其他节点，上一个节点的next等于当前节点的next，其实就是直接等于下一个节点
    prevNode.next = this.findNode(index).next;

    this.length -= 1;
  }

  // 链表查找一个数据，根据index
  findNode(index) {
    // 链表查找只能从头节点开始，一直遍历下去

    let currentIndex = index;

    //先根据index看看顺序在哪里，小于0，默认为0，大于0，默认为链表的长度
    // 其实这里也可以直接报错 out of range
    if (index < 0) {
      currentIndex = 0;
    } else if (index >= this.length) {
      currentIndex = this.length;
    }
    // 头结点开始遍历，遍历到需要查找的index，返回
    let currentNode = this.head;
    for (var i = 0; i < currentIndex; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  // 根据内容返回索引，同样是遍历
  indexOf(data) {
    let currentNode = this.head;
    for (var i = 0; i < this.length; i++) {
      if (currentNode.data === data) {
        return i;
      }
      currentNode = currentNode.next;
    }
    // 没找到就返回-1
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

//testLink.delete(1);
console.dir(testLink, { depth: 100 });
