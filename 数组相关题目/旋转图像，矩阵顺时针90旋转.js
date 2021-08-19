/*
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

 

示例 1：

123         741
456    ->   852
789         963

*/

/**
首页将输入

1 2 3
4 5 6
7 8 9

通过交换matrix[i][j], matrix[j][i] 得到

1 4 7
2 5 8
3 6 9

最后将得到每组数组倒序排列即可

7 4 1
8 5 2
9 6 3



 */
// 输入 [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
var rotate = function (matrix) {
    let martrixLength = matrix.length;
    for (let i = 0; i < martrixLength; i++) {
        for (let j = i; j < martrixLength; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // 这一步就得到了[ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]

    // 先交换，然后反转
    return matrix.map(item => item.reverse());
};
