/**
 * Vnode 有五种大的类型：HTML/SVG元素、组件、纯文本、Fragment、Portal
 * 组件又分为：有状态组件和函数式组件
 * 有状态组件又分为：普通有状态组件、需要被 KeepAlive 有状态组件、已经被 KeepAlive 有状态组件
 * 使用 flags 来表示 Vnode 的不同类型
 * */
 // 枚举对象
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