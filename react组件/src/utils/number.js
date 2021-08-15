// JS浮点数运算Bug的解决办法
// ACC（Accumulator）是累加器A缩写。

const pow = x => 10 ** x;

export function accAdd(arg1, arg2) {
  let r1; let r2;
  //  let m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = pow(Math.max(r1, r2));
  // const m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m) + (arg2 * m)) / m;
}

export function accSub(arg1, arg2) {
  let r1;
  let r2;
  // let m;
  // const n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = pow(Math.max(r1, r2));
  // const m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  const n = (r1 >= r2) ? r1 : r2;
  return (((arg1 * m) - (arg2 * m)) / m).toFixed(n);
}
