/*
   *生成两位整数之间的随机整数(包括两端的整数 )
   *
   **/
export function randomA(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
 *生成两位整数之间的随机整数(不包括两端的整数)
 *
 **/
export function randomB(min, max) {
	min += 1, max -= 1;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}