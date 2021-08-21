class MyStack {
    constructor() {
      this.items = [];
    };

    push(value) {
      this.items.push(value);
    };

    pop() {
      return this.items.pop();
    };

    peek() {
      return this.items[this.items.length - 1];
    };

    isEmpty() {
      return this.items.length === 0;
    };

    clear() {
      return this.items = [];
    };

    size() {
      return this.items.length;
    }
  }

// 测试

let myStack = new MyStack();

myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.pop();
console.log(myStack);
