// A 是否是 B 的超集
export function isSuperset (set, subset) {
  for (var elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

// 合集 A + B
export function union (setA, setB) {
  var _union = new Set(setA)
  for (var elem of setB) {
    _union.add(elem)
  }
  return _union
}

// 并集
export function intersection (setA, setB) {
  var _intersection = new Set()
  for (var elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

// 差集
export function difference (setA, setB) {
  var _difference = new Set(setA)
  for (var elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

export function equal (setA, setB) {
  return new Set([...setA, ...setB]).size === setA.size
}

export default {
  isSuperset,
  union,
  equal,
  intersection,
  difference
}
