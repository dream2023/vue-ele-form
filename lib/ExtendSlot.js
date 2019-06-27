// 用于处理插槽
export default {
  name: 'ExtendSlot',
  functional: true,
  props: {
    render: Function,
    data: Object
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.data)
  }
}
