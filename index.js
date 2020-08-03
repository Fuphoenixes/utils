Date.prototype.toCNString = function() {
	var cn = ["○", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
		yy = this.getFullYear().toString(),
		mm = this.getMonth() + 1,
		dd = this.getDate();
	result = [];
	for (var i = 0; i < yy.length; i++) {
		result.push(cn[yy.charAt(i)] ? cn[yy.charAt(i)] : yy.charAt(i));
	}
	result.push('年');
	if (mm < 10) {
		result.push(cn[mm]);
	} else if (mm < 20) {
		result.push('十' + cn[mm % 10]);
	}
	result.push('月');
	if (dd < 10) {
		result.push(cn[dd]);
	} else if (dd < 20) {
		result.push('十' + cn[dd % 10]);
	} else if (dd < 30) {
		result.push('二十' + cn[dd % 10]);
	} else {
		result.push('三十' + cn[dd % 10]);
	}
	result.push('日');
	return result.join('');
};
//example
new Date().toCNString(); //二○一八年二月二十八日


String.prototype.appendQuery = function(query) {
	if(!query) return '';
	let options = $params(query);
	let url = this + '';
	if (url.includes('?')) {
		url += '&' + options
	} else {
		url += '?' + options
	}
	return url;
};

function $params(obj) {
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

/*
* 保留两位小数正则
* replace(/\.0{2}|(?<=\.\d)0$/g,'')
* */