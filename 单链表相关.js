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
    // console.log(a.data);  这里就是相同值
    a = a.next;
    b = b.next;
  }
}

/*
判断一个单链表是不是回文结构

方法1 用栈，把链表入栈，然后遍历链表的同时，出栈，如果都一样，回文
*/

let huiwenLink = new LinkedList();
huiwenLink.append("1");
huiwenLink.append("1");
huiwenLink.append("1");
huiwenLink.append("1");

//先入栈，js就用数组了

var a = huiwenLink.head;
var arr = [];
while (a && a.data != null) {
  arr.push(a.data);
  a = a.next;
}

// 然后遍历，出栈对比，pop就是出栈，删除最后一个元素，并且返回这个元素值。栈：先入后出
a = huiwenLink.head;
while (a && a.data != null) {
  if (a.data != arr.pop()) {
    console.log("false");
    break;
  }
  a = a.next;
}
// 打印出false就表示不是了
// 当然，这个也可以省一点空间，比如，找到原队列的中间位置，把右半部分入栈
// 怎么找位置，通常单链表用快慢指针，慢指针一次走一步，快指针一次走两步，这样，快指针走完的时候，慢指针就是中间

let kuaimanLink = new LinkedList();
kuaimanLink.append("1");
kuaimanLink.append("2");
kuaimanLink.append("5");
kuaimanLink.append("4");
kuaimanLink.append("3");
kuaimanLink.append("7");
kuaimanLink.append("6");
kuaimanLink.append("0");
//kuaimanLink.append("9");

var slow = kuaimanLink.head;
var fast = kuaimanLink.head;
// wihle这么判断，主要是为了适应链表个数为1个，2个的情况，要不然循环没意义
while (fast.next != null && fast.next.next != null) {
  slow = slow.next;
  fast = fast.next.next;
}
//console.log(slow.data);
// 注意，如果链表是奇数，那么这个就是最中间的，如果链表是偶数个，那么这个就是左半部分最后一个

/*
一个单链表，指定一个数，比他小的在左边，等于他的在中间，比他大的在右边

解法：准备6个变量，分别是小于的头和尾，等于的头和尾，大于的头和尾

遍历，
*/

let partationLink = new LinkedList();
partationLink.append("1");
partationLink.append("2");
partationLink.append("5");
partationLink.append("4");
partationLink.append("3");
partationLink.append("7");
partationLink.append("6");
partationLink.append("0");

var smallhead = null;
var smalltail = null;

var equihead = null;
var equitaol = null;

var largehead = null;
var largetail = null;

const num = 5;

var list = partationLink.head;

while (list && list.data != null) {
  if (list.data < num) {
    if (smallhead == null) {
      smallhead = list;
      smalltail = list;
    } else {
      // 这里不好理解，链表保存的是引用，也就是说，sh，st指向的list，是同一个引用
      // 你修改了st的next，相当于sh的next也就修改了，所以，sh就会一直穿起来，
      // 因为你st是最后一个节点，相当于，把st的最后一个节点修改了，就可以一直穿下去
      smalltail.next = list;
      smalltail = list;
    }
  }

  if (list.data == num) {
    if (equihead == null) {
      equihead = list;
      equitail = list;
    } else {
      equitail.next = list;
      equitail = list;
    }
  }

  if (list.data > num) {
    if (largehead == null) {
      largehead = list;
      largetail = list;
    } else {
      largetail.next = list;
      largetail = list;
    }
  }

  list = list.next;
}

// 到这里，把这六个变量穿起来就是，但是这里注意要判断边界，因为有可能没有小于的，没有大于的，没有等于的

// 其实总共就是三个，判断st有没有，判断et有没有，判断lh有没有

// 这里没什么技巧了，就是一个个判断了
var finalList = null;

if (smalltail) {
  //如果有小于的值
  finalList = smallhead;

  if (equitail) {
    //如果有中间的
    smalltail.next = equihead;

    // 如果有大于的

    if (largehead) {
      equitail.next = largehead;
    }
  } else {
    //没有中间的，如果有大于的

    if (largehead) {
      smalltail.next = largehead;
    } else {
      //没有中间也没有大于的
    }
  }
} else {
  // 没有小于的
  if (equitail) {
    // 如果有中间的
    finalList = equihead;
    //如果有大于的
    if (largehead) {
      equitail.next = largehead;
    }
  } else {
    //没有中间的
    finalList = largehead;
  }
}

console.dir(finalList, { depth: 100 });
