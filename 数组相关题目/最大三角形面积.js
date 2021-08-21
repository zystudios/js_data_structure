/*给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。

示例:
输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
输出: 2


当三个点A、B、C的坐标分别为A(x1，y1)、B(x2，y2)、C(x3、y3)时，三角形面积为，

S=(x1y2-x1y3+x2y3-x2y1+x3y1-x2y2)。


*/

// 暴力

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points) {
  let number = -1;
  for (let i of points)
    for (let j of points)
      for (let k of points)
        number = Math.max(
          number,
          (i[0] * j[1] +
            j[0] * k[1] +
            k[0] * i[1] -
            (i[1] * j[0] + j[1] * k[0] + k[1] * i[0])) /
            2
        );
  return number;
};

//如果在点特别多的时候会做很多无效的计算，因为最大面积的点只能存在于最外围的点，所以可以在遍历前先筛除掉一部分点。

var largestTriangleArea = function(points) {
    let xMin = -Infinity, xMax = Infinity,
        yMin = -Infinity, yMax = Infinity
    points.forEach(p => {
        let [x, y] = p;
        xMin = Math.min(xMin, x)
        xMax = Math.max(xMax, x)
        yMin = Math.min(yMin, y)
        yMax = Math.max(yMax, y)
    })
    points = points.filter(p => {
        let [x, y] = p
        return [xMin, xMax].includes(x) >= 0 || [yMin, yMax].includes(y) >= 0
    })
    // 上面是首先找出来，所有坐标点最大的x y
    return getMin(points)

    function area(p1, p2, p3) {
        let dx1 = p2[0] - p1[0]
        let dx2 = p3[0] - p1[0]
        let dy1 = p2[1] - p1[1]
        let dy2 = p3[1] - p1[1]
        return Math.abs(dx1 * dy2 - dx2 * dy1) / 2
    }
    function getMin(arr) {
        let len = arr.length, res = 0
        for (let i = 0; i < len - 2; ++i) {
            for (let j = i + 1; j < len - 1; ++j) {
                for (let k = j + 1; k < len; ++k) {
                    res = Math.max(res, area(points[i], points[j], points[k]))
                }
            }
        }
        return res
    }
};

