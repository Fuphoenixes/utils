//解决计算偏移 eg. 1.67 - 1 = 0.66999999999   ,改用 accSub(1.67 , 1)
//加法偏移
export function accAdd(arg1, arg2) {
	let r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}
//减法函数
export function accSub(arg1, arg2) {
	let r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//last modify by deeka
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//除法
export function accDiv(arg1, arg2) {
	let t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
	}
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1);
}
//乘法
export function accMul(a, b) {
	let c = 0,
		d = a.toString().replace(',', ''),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) {
	}
	try {
		c += e.split(".")[1].length;
	} catch (f) {
	}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}