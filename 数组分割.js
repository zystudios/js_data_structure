/**
 * 给一个数组，和一个数字，要求小于等于这个数字的排左边，大于的排右边
 * 数组不要求排序
 *
 *
 *
 **/

// 随机生成一个数组，做测试用
function randomArr(n = 20) {
  let arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.round(Math.random() * n));
  }
  return arr;
}

// 这里交换不能用异或，因为涉及同一个位置交换，异或就变为0 了
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function test(arr, num) {
  var leftIndex = 0;
  var i = 0;

  while (i < arr.length) {
    if (arr[i] <= num) {
      swap(arr, i, leftIndex);
      leftIndex++;
      i++;
    } else {
      i++;
    }
  }
  console.log(arr);
}

test(randomArr(10), 6);

/*

升级：数组分割，小于放左边，等于放中间，大于放右边
*/

function test2(arr, num) {
    console.log('ori:',arr);
  var leftIndex = 0;
  var rightIndex = arr.length;
  // 需要两个边界，最左，最右
  var i = 0;

  while (i < arr.length && i < rightIndex) {
    // 关键这个条件i< rightIndex，因为右边都是大于的，所以没必要在比较了

    if (arr[i] < num) {
      swap(arr, i, leftIndex);
      leftIndex++;
      i++;
    } else if (arr[i] == num) {
      i++;
    } else {
      swap(arr, i, rightIndex - 1);
      rightIndex--;
    }
  }
  console.log(arr);
}

test2(randomArr(10), 5);
