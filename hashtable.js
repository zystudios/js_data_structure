// 实现一个hash表，用数组来实现


// 采用链地址法解决冲突，数组每个项，不存具体数据，存一个数组，有相同hashkey的元素就push进数组里，再用key来查找

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
    }
    // 添加
    add(key, value) {
        if (this.table[this.hash(key)]) {
            this.table[this.hash(key)].push({ k: key, v: value });
        } else {
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
        let keyArr = this.table[hashkey];
        for (var i = 0; i < keyArr.length; i++) {
            if ((keyArr[i].k = key)) {
                return keyArr[i].v;
            }
        }
    }
}

var ht = new HashTable();
ht.add('test1', '123');
ht.add('test2', '234');
ht.add('test3', '2345');


ht.delete('test3');
console.dir(ht, { depth: null });
console.log(ht.find('test3'))