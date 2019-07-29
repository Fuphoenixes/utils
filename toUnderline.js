/*eslint-disable*/
/**实现小驼峰命名转化为下划线命名*/
export let toUnderline = (str)=>{
	return str.replace(/[A-Z]/g,val=>{
		return "_"+val.toLowerCase()
	})
};