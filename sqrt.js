
/*
开平方根算法1
定义一个最小值0和最大值number，把一个数取一个中间值（0+number）/2，然后平方，如果平方大于该数值，就把中间值赋给最大值，否者就把中间值赋给最小值，一直循环，直到取到想要的精度为止
*/

var x = 12; // 要开平方根的数字
var jingdu = 0.0001;
var high = x; // 定义一个最高数
var low = 0; // 定义一个最低数
var mid = (low + high) / 2; // 取中间的数字

while (high - low > jingdu) {
    if (mid * mid > x) {
        high = mid;
    } else {
        low = mid;
    }
    mid = (low + high) / 2;
}

console.log(mid);