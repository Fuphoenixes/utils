// 自定义移动端提示框
function Toast(tip,timeout) {
	timeout = timeout || 2000;
	var oBody = document.getElementsByTagName('body')[0];
	console.log(oBody)
	var oStyle = document.createElement('style');
	oStyle.innerHTML = '.toast{z-index:10000000000;font-size:14px;animation: toast 1s linear; -webkit-animation: toast 1s linear; max-width: 3rem;padding: .16rem .27rem;border-radius: .07rem;background: rgba(0,0,0,.7);color: #fff;position: fixed;text-align: center;top:300px;left: 50%;transform: translate3d(-50%,0,0); -webkit-transform: translate3d(-50%,-50%,0); }\n' +
		'        @keyframes toast { 0%{opacity: 0;} 50%{ opacity: .75; } 100%{ opacity: 1; }}\n' +
		'        @-webkit-keyframes toast { 0%{ opacity: 0;} 50%{ opacity: .75; }100%{ opacity: 1; }}'
	oBody.appendChild(oStyle);

	var oToast = document.createElement('p');
	oToast.className = 'toast';
	oToast.innerHTML = '<span>'+tip+'</span>';
	oBody.appendChild(oToast);
	setTimeout(function () {
		oToast.remove();
	},timeout)
}