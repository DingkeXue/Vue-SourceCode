/**
 * 标签的子节点会有以下四种情况：1. 无子节点 2.只有一个子节点 3.有多个子节点 4.不知道子节点情况
 * 其中有多个子节点又分为：1.有key 2.无key 
 * 使用枚举对象来表示子节点个数
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