// 实现一个hash表，用数组来实现


// 采用链地址法解决冲突，数组每个项，不存具体数据，
//存一个数组，有相同hashkey的元素就push进数组里，再用key来查找

class HashTable {
    constructor() {
        this.table = [];
    }

    // hash函数，用来给一个字符串生成hash值
    hash(key) {
        let hashkey = 0;
        for (var i = 0; i < key.length; i++) {
            hashkey += key[i].charCodeAt();
        }
        return hashkey % 13;
        // 这里取质数就行，为什么？因为质数，除了1和他本身，其他都除不尽，这样能够最大限度的保证
        // 用质数作为散列数组的大小是比较明智的，因为这样能保证在数组大小，散列的乘数和可能的数据值之间不存在公因子
    }
    // 添加
    add(key, value) {
        //如果已经存在了，说明hash冲突了，那么这个哈希位置下面用一个数组来存放
        if (this.table[this.hash(key)]) {
            this.table[this.hash(key)].push({ k: key, v: value });
        } else {
            // 否则，直接存放
            let arr = [];
            arr.push({ k: key, v: value });
            this.table[this.hash(key)] = arr;
        }
    }
    // 删除
    delete(key) {
        let hashkey = this.hash(key);
        let keyArr = this.table[hashkey];
        let size = keyArr.length;
        while(size--) {
            if (keyArr[size].k = key) {
                keyArr.splice(size,1);
                return;
            }
        }
    }
    // 查找
    find(key) {
        let hashkey = this.hash(key);
        // 先获得key
        let keyArr = this.table[hashkey];
        // 根据key，直接取下标
        // 遍历这个下标存放数组，根据key取数据
        for (var i = 0; i < keyArr.length; i++) {
            if ((keyArr[i].k = key)) {
                return keyArr[i].v;
            }
        }
    }

    //清空
    clear(){
        this.table = [];
    }
}

var ht = new HashTable();
ht.add('test1', '123');
ht.add('test2', '234');
ht.add('test3', '2345');


ht.delete('test3');
console.dir(ht, { depth: null });
console.log(ht.find('test3'))