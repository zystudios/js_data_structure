/*
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？


借助 m 和 n，生产一个 m*n 的数组(矩阵)，矩阵中填充 1，表示不管之前怎么组合，对于一个单元格，
选择经过它就会生成一个经过它的新路径
迭代这个矩阵，从[0][0]到[m][n]
m 中的指针 i ，n 中的指针 j，迭代过程中 dp[i][j]中存到从[0][0]到达[i][j]的路线种类
dp[i][j]的值等于到达[i][j]的前一步的所有可能的所有可能（及上、左两个入口）：
dp[i][j] = dp[i][j-1] + dp[i-1][j]


*/


var uniquePaths = function(m, n) {
    const dp = Array(m).fill(Array(n).fill(1))
   // mn格子，这里用二维数组表示，填充1

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 遍历二维数组，
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
        }
    }
    return dp[m - 1][n - 1]
}


/*

优化
观察上面的逻辑，dp[i][j]只与 dp[i][j-1] 、 dp[i-1][j]，
那么针对行（或者列）的累加到同一列（或者行）就能实现 dp 的降维
*/


var uniquePaths = function(m, n) {
    const dp = Array(n).fill(1)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1]
        }
    }
    return dp[n - 1]
}
