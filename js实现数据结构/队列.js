class MyQueue {
  constructor() {
    this.items = [];
  }

  //入队操作
  push(element) {
    this.items.push(element);
    return true;
  }
  //出队操作
  pop() {
    return this.items.shift();
  }
  //获取队首
  getFront() {
    return this.items[0];
  }
  //获取队尾
  getRear() {
    return this.items[this.items.length - 1];
  }
  //清空队列
  clear() {
    this.items = [];
  }
  //获取队长
  size() {
    return this.items.length;
  }
}


//测试

var myquene = new MyQueue();
myquene.push(1);
myquene.push(2);
myquene.push(3);
console.log(myquene.size());