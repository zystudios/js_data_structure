/*
请把纸条竖着放在桌⼦上，然后从纸条的下边向上⽅对折，压出折痕后再展 开。此时有1条折痕，突起的⽅向指向纸条的背⾯，这条折痕叫做“下”折痕 ；突起的⽅向指向纸条正⾯的折痕叫做“上”折痕。如果每次都从下边向上⽅ 对折，对折N次。请从上到下计算出所有折痕的⽅向。

给定折的次数n,请返回从上到下的折痕的数组，若为下折痕则对应元素为"down",若为上折痕则为"up".

*/




// N 总共折几次，i当前是第几次，给递归用的，down,方向 初始化是true，就是凹痕
function printprocess(i, N, down) {
  if (i > N) return;
  printprocess(i + 1, N, true);
  if (down) {
    console.log("凹");
  } else {
    console.log("凸");
  }
  printprocess(i + 1, N, false);
}

function folding(N) {
  printprocess(1, N, true);
}

// 折叠3次
folding(2);
