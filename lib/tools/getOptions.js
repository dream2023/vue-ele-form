
// 将字符串转为对象
// '男' => { 'text': '男', 'value': '男' }
function changeToObject (str) {
  if (typeof str !== 'object') {
    return { text: str, value: str }
  } else {
    return str
  }
}

// 转对象的key
// 例如 option: { label: '女', val: 1 }, prop: { text: 'label', value: 'val' }
// 转换后 -> option: { text: '女', value: 1 }
function changeProp (option, prop) {
  if (prop) {
    return { text: option[prop.text], value: option[prop.value] }
  } else {
    return option
  }
}

// 获取options, options 类型为:
// 1.字符串数组: ['男', '女']
// 2.对象数组: [{text: '男', value: 1}, { text: '女', value: 2 }]
// 3.对象和字符串混用: ['男', { text: '女', value: 2 }]
// 4.对象数组 key 不是 text, value: [ { name: 'zhang', id: 1, name: 'li', id: 2 } ], 需要指定 prop: { text: 'name', value: 'id' }
// 5.Promise: Promise必须返回数组
// 6.Function: 函数必须返回数组
/* eslint-disable */
export default function getOptions ({ options, data, prop = { text: 'text', value: 'value' } }) {
  return new Promise(async (resolve, reject) => {
    // 数组类型
    if (Array.isArray(options)) {
      options = options
        .map(option => changeToObject(option))
        .map(option => changeProp(option, prop))
      resolve(options)
    } else if (typeof options === 'function') {
      const res = await getOptions({ options: options(data), data, prop })
      resolve(res)
    } else if (options instanceof Promise) {
      // 当options为Promise时: 等待Promise结束, 并获取值
      options.then(async options => {
        const res = getOptions({ options, data, prop })
        resolve(res)
      })
    } else {
      // 其他报错
      reject(new TypeError(
        'options的类型不正确, options及options请求结果类型可为: 字符串数组, 对象数组, 函数和Promise, 当前值为: ' +
        options +
        ', 不属于以上四种类型'
      ))
    }
  })
}
