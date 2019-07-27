// 是否定义
function isDef (val) {
  return !this.isUnDef(val)
}

// 是否没定义
function isUnDef (val) {
  return val === null || val === undefined
}

// 判断类型
function is (val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

export default {
  isDef,
  isUnDef,
  is
}
