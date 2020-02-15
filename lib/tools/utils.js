import Vue from 'vue'

// 是否定义
export function isDef (val) {
  return !isUnDef(val)
}

// 是否没定义
export function isUnDef (val) {
  return val === null || val === undefined
}

// 判断类型
export function is (val, type) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some(type => `[object ${type}]` === valType)
}

// 判断是否为生产环境
export function isProd () {
  return process.env.NODE_ENV === 'production'
}

// 获取 display: none 的节点宽度和高度
export function getSize (elem) {
  var width
  var height
  var noneNodes = []
  var nodeStyle = []

  getNoneNode(elem) // 获取多层display：none;的元素
  setNodeStyle()
  width = elem.clientWidth
  height = elem.clientHeight
  resumeNodeStyle()

  return {
    width: width,
    height: height
  }

  function getNoneNode (node) {
    var display = getStyles(node).getPropertyValue('display')
    var tagName = node.nodeName.toLowerCase()
    if (display !== 'none' && tagName !== 'body') {
      getNoneNode(node.parentNode)
    } else {
      noneNodes.push(node)
      if (tagName !== 'body') getNoneNode(node.parentNode)
    }
  }

  // 这方法才能获取最终是否有display属性设置，不能style.display。
  function getStyles (elem) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView

    if (!view || !view.opener) {
      view = window
    }
    return view.getComputedStyle(elem)
  }

  function setNodeStyle () {
    var i = 0
    for (; i < noneNodes.length; i++) {
      var visibility = noneNodes[i].style.visibility
      var display = noneNodes[i].style.display
      var style = noneNodes[i].getAttribute('style')
      // 覆盖其他display样式
      noneNodes[i].setAttribute(
        'style',
        'visibility:hidden;display:block !important;' + style
      )
      nodeStyle[i] = {
        visibility: visibility,
        display: display
      }
    }
  }

  function resumeNodeStyle () {
    var i = 0
    for (; i < noneNodes.length; i++) {
      noneNodes[i].style.visibility = nodeStyle[i].visibility
      noneNodes[i].style.display = nodeStyle[i].display
    }
  }
}

// 获取深度val值
// const object = { 'a': { 'b': { 'c': 3 } } };
// getDeepVal(obj, 'a.b.c') => 3
// getDeepVal(obj, 'a.e.c', 0) => 0
export function getDeepVal (obj, path, defaultVal) {
  return path
    .split('.')
    .reduce((acc, key) => acc ? acc[key] : undefined, obj) || defaultVal
}

// 设置深度val值
// isResponse 是否使用 Vue.set
// const object = { 'a': { 'b': { 'c': 3 } } }
// setDeepVal(object, 'a.b.c', 10) => { 'a': { 'b': { 'c': 10 } } }
export function setDeepVal (obj, path, value, isResponse = false) {
  const fields = path.split('.')
  const dateItem = fields
    .slice(0, -1)
    .reduce((acc, key) => {
      if (typeof acc[key] !== 'object') {
        acc[key] = {}
      }
      return acc[key]
    }, obj)

  const lastKey = fields.slice(-1)
  if (isResponse) {
    Vue.set(dateItem, lastKey, value)
  } else {
    dateItem[lastKey] = value
  }
}

// 如果 value 不是数组, 那么强制转为数组
// 空转为空数组 undefined | null | '' => []
// 1 => [1], false => [false], {} => [{}]
export function castArray (value) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return [value]
  }
}

export default {
  isDef,
  isUnDef,
  is,
  isProd,
  getSize
}
