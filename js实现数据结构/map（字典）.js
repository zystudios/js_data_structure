// 字典结构的封装
class Map {
  constructor() {
    this.items = {};
  }

  // has(key) 判断字典中是否存在某个 key
  has(key) {
    return this.items.hasOwnProperty(key);
  }

  // set(key, value) 在字典中添加键值对
  set(key, value) {
    this.items[key] = value;
  }

  // remove(key) 在字典中删除指定的 key
  remove(key) {
    // 如果集合不存在该 key，返回 false
    if (!this.has(key)) return false;
    delete this.items[key];
  }

  // get(key) 获取指定 key 的 value，如果没有，返回 undefined
  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  // 获取所有的 key
  keys() {
    return Object.keys(this.items);
  }

  // 获取所有的 value
  values() {
    return Object.values(this.items);
  }

  // size() 获取字典中的键值对个数
  size() {
    return this.keys().length;
  }

  // clear() 清空字典中所有的键值对
  clear() {
    this.items = {};
  }
}

//test
const map = new Map();

// set() 测试
map.set("name", "XPoet");
map.set("age", 18);
map.set("email", "i@xpoet.cn");
console.log(map); // {items: {name: "XPoet", age: 18, email: "i@xpoet.cn"}}

// has() 测试
console.log(map.has("name")); //--> true
console.log(map.has("address")); //--> false

// remove() 测试
map.remove("name");
console.log(map); // {age: 18, email: "i@xpoet.cn"}

// get() 测试
console.log(map.get("age")); //--> 18

// keys() 测试
console.log(map.keys()); //--> ["age", "email"]

// values() 测试
console.log(map.values()); //--> [18, "i@xpoet.cn"]

// size() 测试
console.log(map.size()); //--> 2
