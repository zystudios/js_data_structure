/*

之前的排序，快排，插入，冒泡，选择，堆，归并，都是基于比较的排序
说白了就是需要比较两个数大小，桶排序不需要比较大小
他是根据词频来排序

优点：时间复杂度O（N）
缺点，比如要知道数字的范围，而且范围不能特别大

举例子：一个数组，里面最小的数字是5，最大的数字是45，排序

首先，申请数组空间，0-45


*/

function tong(arr) {
  var temparr = [];
  for (var i = 0; i < 45; i++) {
    temparr[i] = 0;
  }
  // 因为js数组比较灵魂，且长度随时可变，这里就模拟声明一个长度45的数组，并且0填充

  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    if (temparr[temp]) {
      temparr[temp]++;
    } else {
      temparr[temp] = 1;
    }
  }

  console.log(temparr.toString());
}

//tong([5, 7, 9, 12, 22, 31, 7, 18, 45]);
/*

然后这个数组就变成了，下标是具体数，数组值是出现的次数，也就是词频
那么，遍历一次，就会得到排序好的结果
0,0,0,0,0,1,0,2,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1

5出现1次，7出现2次，9一次。。。。

按照这个下标顺序，就是 5，7，7，9，12，18，22，31，45

这个是最基本的桶排序，利用词频计数，也叫计数排序

但是他限制很大，就是要排序的范围不能太大，比如你一个数组，最小的是0，最大20个亿
那么你数组空间就是20个亿，会极大的浪费

*/

function tong1(arr) {
  // 假设我们需要排序一个整数的数组，整数都是10进制的
  // 我们准备10个桶，为什么是10个，因为十进制数，0-9一共10个
  // 桶只是一个形像的说法，就是容器，可以是数组，队列，列表，栈，等等

  var tongArr = [[], [], [], [], [], [], [], [], [], []];
  // 我们用二维数组模拟一下，这10个桶
  for (var i = 0; i < arr.length; i++) {
    var geweishu = (arr[i] / 1) % 10;
    // 取个位数
    tongArr[geweishu].push(arr[i]);
  }
  // 首先，先根据个位数，放入桶里，放完以后，倒出来
  arr = [];

  for (var j = 0; j < tongArr.length; j++) {
    if (tongArr[j].length > 0) {
      // 判断下桶是不是空
      for (var k = 0; k < tongArr[j].length; k++) {
        arr.push(tongArr[j][k]);
      }
    }
  }

  // 这样，经过上面一轮，原数组里，按照数字个位数，排序已经好了

  // 下面，桶重置一下，按照十位数接着来
  tongArr = [[], [], [], [], [], [], [], [], [], []];

  for (var i = 0; i < arr.length; i++) {
    var shiweishu = Math.trunc((arr[i] / 10) % 10);
    // 取十位数
    tongArr[shiweishu].push(arr[i]);
  }

  arr = [];
  for (var j = 0; j < tongArr.length; j++) {
    if (tongArr[j].length > 0) {
      // 判断下桶是不是空
      for (var k = 0; k < tongArr[j].length; k++) {
        arr.push(tongArr[j][k]);
      }
    }
  }

  // 这样，十位数也排序完了，因为我们这个原始数组里，最大的是111，是个三位数，所以还有按照百位再来一次

  tongArr = [[], [], [], [], [], [], [], [], [], []];

  for (var i = 0; i < arr.length; i++) {
    var baiweishu = Math.trunc((arr[i] / 100) % 10);
    // 取百位数
    tongArr[baiweishu].push(arr[i]);
  }

  // 总结一个技巧，一个数组取个位十位百位等 n / 位数（个位1，十位10，百位100，千位1000...） % 10，

  arr = [];
  for (var j = 0; j < tongArr.length; j++) {
    if (tongArr[j].length > 0) {
      // 判断下桶是不是空
      for (var k = 0; k < tongArr[j].length; k++) {
        arr.push(tongArr[j][k]);
      }
    }
  }

  // 这里，就完成了，因为最大是三位数，如果有四位数，那就千位再来一次，以此类推

  console.log(arr);
}

//tong1([12, 23, 4, 111, 67, 45, 19]);

// 上面的过程有点繁琐，我们简化一下  maxWeishu表示当前数组里最大的位数

function tong2(arr, maxWeishu) {
  var tongArr = [[], [], [], [], [], [], [], [], [], []];
  for (var i = 0; i < maxWeishu; i++) {
    tongArr = [[], [], [], [], [], [], [], [], [], []];

    for (var j = 0; j < arr.length; j++) {
      var weishu = Math.trunc((arr[j] / Math.pow(10, i)) % 10);
      // 取位数,注意这个小技巧 n / 位数（个位1 十位10，百位100...） % 10
      tongArr[weishu].push(arr[j]);
    }

    arr = [];
    for (var m = 0; m < tongArr.length; m++) {
      if (tongArr[m].length > 0) {
        // 判断下桶是不是空
        for (var n = 0; n < tongArr[m].length; n++) {
          arr.push(tongArr[m][n]);
        }
      }
    }
  }
  console.log(arr);
}

//tong2([25, 17, 86, 6, 1, 123, 245, 278, 891, 1, 3, 12, 6, 8], 3);

// 再改进一下，自动判断最大位数

function tong3(arr) {
  var tongArr = [[], [], [], [], [], [], [], [], [], []];

  var maxWeishu = 0;
  // 先找数组最大的数字
  for (var max = 0; max < arr.length; max++) {
    if (arr[max] > maxWeishu) {
      maxWeishu = arr[max];
    }
  }
  // 取位数
  maxWeishu = Math.trunc(maxWeishu / 10) + 1;

  for (var i = 0; i < maxWeishu; i++) {
    tongArr = [[], [], [], [], [], [], [], [], [], []];

    for (var j = 0; j < arr.length; j++) {
      var weishu =Math.trunc((arr[j] / Math.pow(10, i)) % 10);
      // 取位数,注意这个小技巧 n / 位数（个位1 十位10，百位100...） % 10
      tongArr[weishu].push(arr[j]);
    }

    arr = [];
    for (var m = 0; m < tongArr.length; m++) {
      if (tongArr[m].length > 0) {
        // 判断下桶是不是空
        for (var n = 0; n < tongArr[m].length; n++) {
          arr.push(tongArr[m][n]);
        }
      }
    }
  }
  console.log(arr);
}
tong3([25, 17, 86, 6, 1, 123, -245, 278, 891, 1, 3, 12, 6, 8]);