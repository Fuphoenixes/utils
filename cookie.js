/*eslint-disable*/
export let setCookie = (name,value,time)=>{
	let hours = time?time:4;  //单位小时
	let exp = new Date();
	exp.setTime(exp.getTime() + hours*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
};
export let getCookie= (name)=>{
	let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]) ;
	}else {
		return null ;
	}
};
export let delCookie= (name)=>{
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	document.cookie = name + "=" + getCookie(name) + ";expires=" + exp.toGMTString() + ";path=/";
};