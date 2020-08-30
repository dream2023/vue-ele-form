export function loadMockJs() {
  if (!window.Mock) {
    const secScript = document.createElement('script')
    secScript.setAttribute('type', 'text/javascript')
    secScript.setAttribute('src', 'https://unpkg.com/mockjs@1.1.0/dist/mock.js')
    document.body.insertBefore(secScript, document.body.lastChild)
  }
}

export default function mock() {
  const Mock = window.Mock
  if (window.Mock) {
    // 自定义扩展
    Mock.Random.extend({
      multiple(data) {
        const count = Mock.Random.integer(0, data.length)
        return [...new Set(Array.from({ length: count }, () => Mock.Random.pick(data)))]
      },
      checkbox(data, valueKey = 'value') {
        if (Array.isArray(data)) {
          const values = data.map((item) => item[valueKey])
          const count = Mock.Random.integer(0, data.length)
          return [...new Set(Array.from({ length: count }, () => Mock.Random.pick(values)))]
        } else {
          return []
        }
      },
      radio(data, valueKey = 'value') {
        if (Array.isArray(data)) {
          const values = data.map((item) => item[valueKey])
          return Mock.Random.pick(values)
        } else {
          return null
        }
      }
    })
  }

  return Mock
}
