/*eslint-disable*/
//js 延迟函数 函数去抖
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）默认·500ms
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export const debounce = function (fn, delay = 500) {
	let timer = null;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this,...args)
		}, delay)
	}
}
