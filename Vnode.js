/**
 * Vue中用虚拟Node描述真实DOM，Vnode不仅能提高性能，还能跨平台使用
 * VNode分为五类：HTML/SVG元素、组件（有状态组件和函数式组件）、纯文本、Fragment、Portal
 * 使用 h 函数来作为 Vnode 对象的封装函数
 * */
 
 
// 一个最简单的 h 函数
function h1() {
	return {
		// 是否为虚拟节点
		_isVnode: true,
		// 节点类型
		flags: VNodeFlags.ELEMENT_HTML,
		// 标签类型
		tag: 'h1',
		// 标签属性
		data: null,
		// 标签孩子
		children: null,
		// 标签孩子个数
		childFlags: ChildrenFLags.NO_CHILDREN,
		el: null
	}
}