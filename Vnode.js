/**
 * Vue中用虚拟Node描述真实DOM，Vnode不仅能提高性能，还能跨平台使用
 * VNode分为五类：HTML/SVG元素、组件（有状态组件和函数式组件）、纯文本、Fragment、Portal
 * 使用 h 函数来作为 Vnode 对象的封装函数
 * */
const ChilrenFlags = {
	 // 未知的 children 类型
	 UNKONWN_CHILDREN: 0,
	 // 没有 children
	 NO_CHILDREN: 1,
	 // 只有一个children
	 SINGLE_VNODE: 1<<1,
	 // 多个无key的children 
	 NONE_KEYED_VNODES: 1<<3,
	 // 多个有key的children
	 KEYED_VNODES: 1<<2
 }
 
 const VnodeFlags = {
 	 // HTML 标签
 	 ELEMENT_HTML: 1,
 	 // svg 标签
 	 ELEMENT_SVG: 1<<1,
 	 
 	 // 普通有状态组件
 	 COMPONENT_STATEUL_NORMAL: 1<<2,
 	 // 需要被keep-alive 的有状态组件
 	 COMPUNENT_STATFUL_SHOULD_KEEP_ALIVE: 1<<3,
 	 // 已经被keep-alive的有状态组件
 	 COMPUNENT_STATFUL_KEPT_ALIVE: 1<<4,
 	 // 函数式组件
 	 COMPUNENT_FUNCTIONAL: 1<<5,
 	 
 	 // 纯文本
 	 TEXT: 1 << 6,
 	 // Fragment
 	 FRAGMENT: 1<<7,
 	 // Portal
 	 PORTAL: 1<<8
  }
 
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

// 标准 h 函数，用 tag 类型判断 Vnode 的 flags，用 children 判断 childrenFlags 
function h1(tag, data=null, children=null) {
	let flags = null;
	// 判断 tag 的flags类型
	if(typeof tag === "string") {
		flags = tag === 'svg'?VnodeFlags.ELEMENT_SVG:VnodeFlags.ELEMENT_HTML;
	} else if(tag === Fragment) {
		flags = tag = VnodeFlags.FRAGMENT;
	} else if(tag === Portal) {
		flags = tag = VnodeFlags.PORTAL;
	} else {
		// 兼容 Vue2 的对象式组件
		if(tag !== null && typeof tag === 'object') {
			flags = tag.function ? VnodeFlags.COMPUNENT_FUNCTIONAL : VnodeFlags.COMPONENT_STATEUL_NORMAL;
		} else if(typeof tag === 'object') {
			// Vue3 的类组件
			flags = tag.prototype && tag.prototype.render
			? VnodeFlags.COMPONENT_STATEUL_NORMAL : VNodeFlags.COMPUNENT_FUNCTIONAL;
	}
	
	// 判断 children 的flags 类型
	let childFlags = null;
	if(Array.isArray(children)) {
		const {length} = children;
		if(length === 0) {
			// 没有 children
			childFlags = ChildrenFLags.NO_CHILDREN;
		} else if(length === 1) {
			// 一个孩子
			childFlags = ChildrenFLags.SINGLE_VNODE;
			children = children[0];
		} else {
			// 多个子节点
			childFlags = ChildrenFLags.KEYED_VNODES;
			children = normalizeVnode(children);
		}
	} else if (children === null) {
		childFlags = ChildrenFLags.NO_CHILDREN;
	} else if (children._isVnode) {
		//单个子节点
		childFlags = ChildrenFLags.SINGLE_VNODE;
	} else {
		//其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的 VNode
		childFlags = ChildrenFLags.SINGLE_VNODE;
		children = createTextVNode(children + '');
	}
}

// 如果 children 是数组，则根据数组的长度来判断 children 的类型到底是 
// ChildrenFlags.NO_CHILDREN、ChildrenFlags.SINGLE_VNODE 还是 ChildrenFlags.KEYED_VNODES
function normalizeVnode(children) {
	let newChildren = [];
	for(let i = 0; i < children.length;i++) {
		child = children[i];
		if(child.key === null) {
			// 如果没有 key,则添加
			child.key = "|" + i;
		}
		newChildren.push(children);
	}
	return newChildren;
}

/* 
如果 children 不满足以上任何条件，则会把 children 作为纯文本节点的文本内容处理，
这时会使用 createTextVNode 函数创建一个纯文本类型的 VNode，createTextVNode 函数接收一个字符串作为参数，
创建一个与之相符的纯文本类型的 VNode 
 */
function createTextVNode(text) {
	return {
		_isVnode: true,
		flags: VnodeFlags.TEXT,
		tag: null,
		data: null,
		// 纯文本的children为text
		children: text,
		childrenFlags: ChildrenFLags.NO_CHILDREN,
		el: null
	}
}