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
选择排序
原理：n个数字的数组，
1-n
2-n
3-n
....
n-n
每次后面的数字和第一个比较，要是小于就交换（或者大于，看是从大到小还是从小到大）

时间复杂度 n²

*/

function select_sort1(arr) {
  console.time("select_sort1");
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      // 第一种方法，如果大于就立即交换，这种算法会频繁交换数组，效率不高不推荐
      if (arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
  console.timeEnd("select_sort1");
  console.log(arr);
}
// select_sort1(randomArr());

function select_sort2(arr) {
  console.time("select_sort2");
  for (var i = 0; i < arr.length; i++) {
    var min_index = i;
    for (var j = i; j < arr.length; j++) {
      //第二种，我们用个变量min_index记录下来
      if (arr[min_index] > arr[j]) {
        min_index = j;
      }
    }
    // 循环完了，交换一次
    swap(arr, i, min_index);
  }
  console.timeEnd("select_sort2");
  console.log(arr);
}

//select_sort2(randomArr());

/*
  冒泡排序
  原理：n个数字数组
  1 和 2 比较交换，2 和 3 比较交换，直到最后 n-1 和 n比较交换

  时间复杂度 n²
*/

function bubble_sort(arr) {
  console.time("bubble_sort");
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  console.timeEnd("bubble_sort");
  console.log(arr);
}

//bubble_sort(randomArr());

/*
快速排序

原理：数组中找一个数，作为基准，比他大的放右边，比他小的放左边
这样就拆成了2个子数组，左边和右边递归直到 i==j
*/

//arr 数组，i左指针，j右指针,第一次的时候给两个默认值，分别是数组头元素下标和尾元素下标

// 这个partition 是一次拆分函数，原理就是比基准数小的放左边，比基准数大的放右边
function partition(arr, left, right) {
  // 先设置基准数的索引，我们以数组最后一个数字为基准
  var base = arr[right];
  var i = left - 1;
  // 因为我们选择了最后一个数作为基准数，所以j的位置就是倒数第二个
  var j = right;
  // i从数字0开始向右扫描，j从数组末尾开始向左扫描
  while (i < j) {
    //从前往后，一直找到不小于base的位置
    while (arr[++i] < base);
    // 从后往前，一直找到小于base的位置
    while (arr[--j] > base);

    if (i < j) {
      swap(arr, i, j);
    }
  }
  // 最后一步，把基准数字和i位置的交换
  swap(arr, i, right);
  // 这里返回的是i，也就是基准数字的位置
  return i;
}

function quick_sort(arr, left, right) {
  if (left < right) {
    var base_index = partition(arr, left, right);
    // 找到基准数的位置，然后分别遍历左边的和右边的
    quick_sort(arr, left, base_index - 1);
    quick_sort(arr, base_index + 1, right);
  }
}

//let testArr = randomArr();

//console.log('原始', testArr);
//quick_sort(testArr, 0, testArr.length - 1);
//console.log('排序', testArr);

/*
插入排序

原理，数组，0，0-1，0-2，0-3。。。 0-n，每个区间里单独进行排序

时间复杂度 n²
*/

function insert_sort(arr) {
  console.time("insert_sort");
  // 这里i直接1开始了，因为第一个数不需要排序
  for (var i = 1; i < arr.length; i++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
      }
    }
  }
  console.timeEnd("insert_sort");
  console.log(arr);
}
//insert_sort(randomArr());

/*

归并排序

数组先找一个中间点，然后左边排好序，右边排好序

比如 有个数组 【3，2，1，5，6，2】
从中间分割，两个数组  3，2，1   和 5，6，2

左侧排序 1，2，3  右侧排序 ，2，5，6

开始比较，左边第一个1，和右边第一个比较，1小
所以是1，然后左边移动到第二个，2，2 比右边第一个2 小于等于，所以是

1，2，然后左边移动到3，3比右边第一个2大，所以，右边2 下来
1，2，2，右边移动到5，左边是3，3小于5，3下来
1，2，2，3，这个时候，左边没有了，右边就剩下的都下来
1，2，2，3，5，6

几个关键点
1 找数组中间
2 分割以后，左右两边排序，这个怎么排序？


时间复杂度：N+logN

*/

function merge_sort(arr, left, right) {
  // 三个参数，第一个就是数组，第二个是左边下标，第三个是右边下标

  if (left == right) {
    // 如果左边右边下标相等了，退出
    return;
  }
  var mid = Math.trunc((left + right) / 2);

  // 取一个中间值，还有一个写法 left + (right - left) >> 1  右移1位表示除2
  merge_sort(arr, left, mid);
  merge_sort(arr, mid + 1, right);

  // 上面递归，把一个数组，直到拆成两个最小的

  // merge 就是合并左右两个，排序
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  var tempArr = [];
  // 先用一个临时数组
  // 这个时候，左数组其实就是，arr left mid
  // 右数组就是arr mid+1 right

  var leftStart = left;
  var RightStart = mid + 1;

  // 用两个变量，表示左侧和右侧的开始位置

  while (leftStart <= mid && RightStart <= right) {
    // 左右都不越界，这个时候排序，拷贝到临时数组tempArr

    if (arr[leftStart] <= arr[RightStart]) {
      tempArr.push(arr[leftStart]);
      leftStart++;
    } else {
      tempArr.push(arr[RightStart]);
      RightStart++;
    }
  }

  // 因为左右个数不相等，比如数组位数是奇数个，这个时候就要判断下，左边还是右边有剩余的

  while (leftStart <= mid) {
    tempArr.push(arr[leftStart++]);
  }

  while (RightStart <= right) {
    tempArr.push(arr[RightStart++]);
  }

  // 最后一步，就是把这个临时数组，替换回原数组
  // 注意的是，这里tempArr只是一个小数组，代表了原始arr数组里面一个小部分的排序
  // 所以这里需要给的left左下标，把arr里面 left开始的，都替换为temparr

  for (var i = 0; i < tempArr.length; i++) {
    arr[left + i] = tempArr[i];
  }
}

var testArr = randomArr(30);
console.time("merge_sort");
merge_sort(testArr, 0, testArr.length - 1);
console.timeEnd("merge_sort");
console.log("%s", testArr);
