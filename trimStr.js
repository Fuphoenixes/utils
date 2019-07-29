//去除首尾空格
export default function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g,"");
}