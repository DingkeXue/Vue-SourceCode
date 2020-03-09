// 使用 promise 来实现 ajax 加载
const getJSON = function(url) {
	const promise = new Promise((resolve, reject) => {
		const handler = function() {
			if(this.readyState !== 4) {
				return;
			}
			if(this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
		const client = new XMLHttpRequest();
		client.open("GET", url);
		client.onreadystatechange = handler();
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/text");
		client.send();
	});
	return promise;
}

getJSON("/posts.json").then((success) => {
	console.log("Content:" + success);
})