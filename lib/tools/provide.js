let Mock = {}
if (process.env.NODE_ENV !== 'production') {
  Mock = require('mockjs')
  // 自定义扩展
  Mock.Random.extend({
    multiple (data) {
      const count = Mock.Random.integer(0, data.length)
      return [...new Set(Array.from({ length: count }, () => Mock.Random.pick(data)))]
    },
    checkbox (data, valueKey = 'value') {
      if (Array.isArray(data)) {
        const values = data.map((item) => item[valueKey])
        const count = Mock.Random.integer(0, data.length)
        return [...new Set(Array.from({ length: count }, () => Mock.Random.pick(values)))]
      } else {
        return []
      }
    },
    radio (data, valueKey = 'value') {
      if (Array.isArray(data)) {
        const values = data.map((item) => item[valueKey])
        return Mock.Random.pick(values)
      } else {
        return null
      }
    }
  })
}

export default {
  mockFn: Mock.mock,
  randomFn: Mock.Random
}
