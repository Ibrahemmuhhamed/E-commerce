var maxArea = function (height) {
  const l = height.length;
  const start = height[0] <= height[l - 1] ? 1 : 0;
  const end = l - +!start - 1;
  console.log(end);
  const Length = height[end];
  console.log(Length);
  const width = end - start || 1;
  return Length * width;
};

// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    for (const [index, value] of nums.entries()) {
      const complement = -x - value;
      if (hashMap.has(complement)) {
        console.log([nums[hashMap.get(complement)], nums[index]], "X == > ", x);
        return;
      }
      hashMap.set(value, index);
    }
  }
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
