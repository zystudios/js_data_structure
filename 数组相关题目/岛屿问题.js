
/*
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

 
示例 1：

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1


-----------------------------------------------------------------------------

深度优先搜索dfs

遍历网格，遇到为1的格子，就对格子的四周做搜索，同时将为1的格子标为0。
遍历完成以后，就是一个岛

然后再从之前的位置继续遍历

岛屿数量即为搜索次数。

3. 复杂度分析
时间复杂度：O(M*N)，M 和 N 分别为行数和列数。

空间复杂度：O(MN)，最坏情况下，整个网格均为陆地，DFS深度达到 MN。



*/

const dfs = (grid, r = 0, c = 0) => {
    const nr = grid.length;
    const nc = grid[0].length;

    if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == '0') {
        return;
    }

    // 将当前点置为0,表示已经搜索了
    grid[r][c] = '0';
    // 左
    dfs(grid, r - 1, c);
    // 右
    dfs(grid, r + 1, c);
    // 下
    dfs(grid, r, c - 1);
    // 上
    dfs(grid, r, c + 1);
}

var numIslands = function(grid) {
    if (grid == null || grid.length == 0) {
        return 0;
    }
    // 行
    const nr = grid.length;
    // 列
    const nc = grid[0].length;
    let num_islands = 0;
    // 对每个点遍历,row col 行列
    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            // 如果是1，做dfs遍历
            if (grid[r][c] == '1') {
                num_islands++;
                // r, c为当前坐标
                dfs(grid, r, c);
            }
        }
    }

    return num_islands;
};
