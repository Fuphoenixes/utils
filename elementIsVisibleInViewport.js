/**
 * 传入第一个参数dom元素判断它在当前视窗是否可见
 * 第二个参数默认为false可缺省，为true的时候表示该元素部分可见就会返回true
 * @param {object，Boolean}
 * @example
 *  elementIsVisibleInViewport(document.querySelector('div'), true)
 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
	const { top, left, bottom, right } = el.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return partiallyVisible
		? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
		((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

export default elementIsVisibleInViewport