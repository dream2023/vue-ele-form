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
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some(type => `[object ${type}]` === valType)
}

export default {
  isDef,
  isUnDef,
  is
}
