const $params = function (obj) {
	const str = [];
	for (const k in obj) {
		if(obj.hasOwnProperty(k)) {
			str.push(
				encodeURIComponent(k) +
				'=' +
				encodeURIComponent(typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : obj[k])
			);
		}
	}
	return str.join('&');
};

const jsonP = function (url,data) {
	const global = window;
	return new Promise((resolve,reject)=>{
		const jsonPCallbackName = "jsonP" + new Date().getTime();
		url = url.replace(/\?$/,"") + '?' + $params(data);
		url += "callback=" + jsonPCallbackName;
		const script = document.createElement("script");
		script.src = url;
		global[jsonPCallbackName] = function(data){
			resolve(data);
			delete global[jsonPCallbackName];
			document.body.removeChild(script)
		};
		script.onerror = reject;
		document.body.appendChild(script);
	})
};

export default jsonP;

