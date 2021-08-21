class MyStack {
  constructor() {
    this.items = [];
    // 存放最小的
    this.minItems = [];
  }
  // 入栈
  push(value) {
    this.items.push(value);
    // 看value 和最小栈的栈顶元素哪个小，要是value小，就入栈
    if (
      this.minItems.length == 0 ||
      this.minItems[this.minItems.length - 1] >= value
    ) {
      this.minItems.push(value);
    }
  }
  // 出栈
  pop() {
    //判断stack中即将弹出的元素和min栈顶的元素是否相等，若相等，则要把min栈顶的元素弹出，防止找不到最小值
    if (this.items[this.items.length - 1] == this.minItems[this.minItems.length - 1]) {
      this.minItems.pop();
    }
    return this.items.pop();
  }
  // 获取最后一个元素 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    return (this.items = []);
  }

  size() {
    return this.items.length;
  }

  getMin(){
    return this.minItems[this.minItems.length-1];//min栈顶保存当前栈中的最小值
  }
}

// 测试

let myStack = new MyStack();

myStack.push(7);
myStack.push(2);
myStack.push(3);
myStack.push(0);
myStack.push(2);
myStack.push(5);

myStack.pop();
myStack.pop();
myStack.pop();
console.log(myStack.getMin());
