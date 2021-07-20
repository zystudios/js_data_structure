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
    console.time('select_sort1');
    for (var i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
            // 第一种方法，如果大于就立即交换，这种算法会频繁交换数组，效率不高不推荐
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
    console.timeEnd('select_sort1');
    console.log(arr);
}
// select_sort1(randomArr());

function select_sort2(arr) {
    console.time('select_sort2');
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
    console.timeEnd('select_sort2');
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
    console.time('bubble_sort');
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    console.timeEnd('bubble_sort');
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

let testArr = randomArr();

console.log('原始', testArr);
quick_sort(testArr, 0, testArr.length - 1);
console.log('排序', testArr);
