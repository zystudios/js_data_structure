// 数组交换
function swap(arr, i, j) {
  // 把数组里面 i位置和j位置交换
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 随机生成一个数组，做测试用
function randomArr(n = 20) {
  let arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}

/*
 满二叉树，是完全二叉树

 完全二叉树，就是一个二叉树，从左到右，顺序上不缺

     1
   2   3
 4   5

 是一个完全二叉树，从左到右，位置不缺

     1
   2   4
 3   5

 不是完全二叉树，因为2的右孩子缺了


公式

完全二叉树， 知道某个位置i，左孩子 2i+1   右孩子 2i+2  父节点：(i-1) / 2 直接取证

比如  下面的完全二叉树，用位置表示

       0
   1       2
 3   4   5

 1 位置的左孩子位置  2x1 + 1 = 3
 1 位置的右孩子位置  2x1 + 2 = 4
 1 位置父节点 (1-1) / 2 = 0

 注意，上面012345 都是位置，非数值，在数组里可以用一个连续空间表示

 [2，3，6，1，7，8]
  0，1，2，3，4，5

  如果用实际数值表示就是

       2
   3       6
 1   7   8

 数字3的左孩子是几？ 数字3的位置是1，2x1+1 = 3，3位置的数字是1
 以此类推


 堆：特殊的完全二叉树
 所以堆肯定是完全二叉树

 堆，分 大根堆 小根堆

 大根堆：完全二叉树里，每一个节点的子树，他的所有节点都小于这个子树根节点

 小根堆：完全二叉树里，每一个节点的子树，他的所有节点都大于这个子树根节点

 换句话说，大根堆，头结点在子树里最大，小根堆，头结点在子树里最小

*/

// 堆排序
// 时间复杂度 logN

//不管是向上比较 heapInsert  还是向下比较 heapify，他只是一条路径，不会管他兄弟的路径，所以是logN

function heapInsert(arr, currentIndex) {
  // 判断和父节点哪个大
  var fatherIndex = Math.floor((currentIndex - 1) / 2);
  // 当前的父节点，必须大于0，等于0说明已经是根节点了
  while (arr[currentIndex] > arr[fatherIndex]) {
    // 当前节点的值，和他父节点比较大小，如果大于父节点，那么就交换
    swap(arr, currentIndex, fatherIndex);
    // 交换完位置以后，当前节点位置就指向父节点了，因为还要和父节点的父节点比较大小，一步步向根节点迈进，确保这个最大值一直向上交换
    currentIndex = fatherIndex;
    // 这个时候父节点就是之前父节点的父节点了
    // 这是一个从下到上的过程
    fatherIndex = Math.floor((currentIndex - 1) / 2);
  }
}

// // 测试一下，比如，把这个二叉树，整理成大根堆
// var testArr = [2, 3, 4, 7, 1, 8, 9, 0];
// var arr = [];
// for (var i = 0; i < testArr.length; i++) {
//   arr.push(testArr[i]);
//   heapInsert(arr, i);
// }
// console.log(arr);

// 堆化，什么意思，就是比较每个节点的左右孩子，如果节点值大于左右孩子里最大的，停止
// 如果节点值 小于左孩子或者右孩子里面最大的，节点和这个最大的交换
// 然后继续向下，直到某个节点没有孩子，或者只有一个孩子
function heapify(arr, currentIndex, heapsize) {
  // 左孩子，右孩子的位置
  var leftChild = Math.floor(currentIndex * 2 + 1);
  var rightChild = Math.floor(currentIndex * 2 + 2);

  while (leftChild < heapsize) {
    var lagerIndex = 0;
    // 如果右孩子存在，并且，右孩子数值大于左孩子数值
    if (rightChild < heapsize && arr[rightChild] > arr[leftChild]) {
      lagerIndex = rightChild;
    } else {
      lagerIndex = leftChild;
    }

    // 这个时候，largeIndex就是 左孩子和右孩子里面，比较大的那个位置
    // 然后和父比较,注意，这个时候，currentIndex 就是父节点

    if (arr[lagerIndex] > arr[currentIndex]) {
      largeIndex = lagerIndex;
    } else {
      largeIndex = currentIndex;
    }

    // 这个时候，largeIndex 就是 父，左，右，三个里面最大的那个位置了

    if (largeIndex == currentIndex) {
      // 如果最大的这个就是父本身，那么结束循环
      break;
    }

    // 父节点和large交换，这时候，large要么是左孩子，要么是右孩子

    swap(arr, largeIndex, currentIndex);

    // 交换完以后，更新节点。largeIndex本身就是孩子节点
    // 左孩子节点就是那个比较大的large的左孩子
    // 右孩子就是那个比较大的large的右孩子
    // currentIndex 之前就是父节点，这个时候等于largeindex，就是说要开始比较这个孩子的左右孩子了
    // 这是一个从上到下的过程

    currentIndex = largeIndex;

    leftChild = Math.floor(largeIndex * 2 + 1);
    rightChild = Math.floor(largeIndex * 2 + 2);
  }
}

// 堆排序开始
// 首先，任何一个数组，先变成大根堆

var testArr = randomArr(20);

for (var i = 0; i < testArr.length; i++) {
  heapInsert(testArr, i);
}

// 上面就变成大根堆了

var heapsize = testArr.length;

// 然后，就是开始向下比较了
while (heapsize > 0) {
  heapify(testArr, 0, heapsize);
  // heapify以后，数组第一个就是最大数了，这个时候，第一个和最后一个交换
  swap(testArr, 0, heapsize - 1);
  // 交换以后，heapsize -- ，然后就不在比较这个最大数了，比较他前面的数组，重复，直到剩最右一个数
  heapsize--;
}

console.log(testArr);

/*

改进算法，上面把一个数组先转为大根堆，是一个个进行的方式
其实有个更好的办法，直接把这个数组 heapify 就可以
heapify 从上向下，比较孩子
会稍微快那么一点点
*/

var testArr2 = randomArr(10);
for (var i = testArr2.length - 1; i >= 0; i--) {
  heapify(testArr2, i, testArr2.length);
}

console.log(testArr2);
