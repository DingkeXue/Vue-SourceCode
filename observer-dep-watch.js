// vue 响应式原理
// observer
class Observer {
	constructor(data) {
	    this.valk(data);
	}
	
	walk(data) {
		// 遍历 对象
		let keys = Object.keys(data);
		for(let i = 0; i < keys.length; i++) {
			defineReactive(data, keys[i], data[keys[i]]);
		}
	}
}

// defineReactive 
function defineReactive(data, key, val) {
	observer(val);
	let dep = new Dep();
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			dep.depend();
			return val;
		},
		set: function(newVal) {
			if(val === newVal) {
				return;
			}
			observer(newVal);
			dep.notify();
		}
	})
}

// Observer
function observer(data) {
	if(Object.prototype.toString.call(data) !== "[object Object]") {
		return;
	}
	new Observer(data);
}

// Dep 
class Dep() {
	constructor() {
		this.subs = [];
	}
	depend() {
		this.subs.push(Dep.target);
	}
	notify() {
		for(let i = 0; i < this.subs.length; i++) {
			this.subs[i].fn();
		}
	}
}

Dep.target = null;

function pushTarget(watch) {
	Dep.target = watch;
}

// watch
class Watch {
	constructor(exp, fn) {
		this.exp = exp;
		this.fn = fn;
		pushTarget(this);
		data[exp];
	}
}

// data
var data = {
	a: 1,
	b: {
		c: 2
	}
}

observer(data);

new Watch("a", () => {
	console.log(9)
});
new Watch("a", () => {
	console.log(90)
});
new Watch("b.c", () => {
	console.log(80);
})