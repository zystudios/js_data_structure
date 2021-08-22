/*

条件：必须是有序的数组，升序或者降序

每次砍一半，比较左右两边

*/
// 随机生成一个数组，做测试用
function randomArr(n = 100) {
  let arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.round(Math.random() * n));
  }
  return arr;
}

var half_find_flag;
var half_find_new_flag;

function half_find(arr, num) {
  if (arr.length <= 2) {
    if (arr[0] == num || arr[1] == num) {
      half_find_flag = true;
    } else {
      half_find_flag = false;
    }
    return;
  }

  // 先找数组中间的下标
  var mid = Math.trunc(arr.length / 2);
  // 根据中间的下标，分割两个数组
  // 这个需要优化，数组分割有点耗时
  var left = arr.slice(0, mid + 1);
  var right = arr.slice(mid, arr.length);
  if (num == arr[mid]) {
    half_find_flag = true;
    return;
  } else if (num < arr[mid]) {
    // 说明在左边
    half_find(left, num);
  } else {
    // 说明在右边
    half_find(right, num);
  }
}

function start(arr, num) {
  // 判断下边界，如果小于第一个，或者大于最后一个数字，表示根本不存在这个数组里面
  if (num < arr[0] || num > arr[arr.length - 1]) {
    half_find_flag = false;
    return;
  }
  half_find(arr, num);
}


// 优化算法，不在额外分割数组，可以看到耗时减少一半，但是还远不如系统自带indexOf
function half_find_new(arr, num, left, right) {
  if (Math.abs(left - right) < 2) {
    if (arr[left] == num || arr[right] == num) {
      half_find_new_flag = true;
    } else {
      half_find_new_flag = false;
    }
    return;
  }

  // 先找数组中间的下标
  var mid = Math.trunc((left + right) / 2);

  if (num == arr[mid]) {
    half_find_new_flag = true;
    return;
  } else if (num < arr[mid]) {
    // 说明在左边
    half_find_new(arr, num, left, mid);
  } else {
    // 说明在右边
    half_find_new(arr, num, mid + 1, right);
  }
}

function start1(arr, num) {
  // 判断下边界，如果小于第一个，或者大于最后一个数字，表示根本不存在这个数组里面
  if (num < arr[0] || num > arr[arr.length - 1]) {
    half_find_new_flag = false;
    return;
  }
  half_find_new(arr, num, 0, arr.length - 1);
}

var testArr = randomArr();
testArr.sort(function (a, b) {
  return a - b;
});

console.log(testArr);

console.time("half_find");
start(testArr, 90);
console.timeEnd("half_find");
console.log(half_find_flag);

console.time("half_find_new");
start1(testArr, 90);
console.timeEnd("half_find_new");
console.log(half_find_new_flag);

console.time("indexof");
testArr.indexOf(90);
console.timeEnd("indexof");

