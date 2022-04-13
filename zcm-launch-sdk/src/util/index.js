/*  设置meta
	CSP（Content Security Policy），是一个跟页面内容安全有关的规范。
	在 HTTP 中通过响应头中的 Content-Security-Policy
	字段来告诉浏览器当前页面要使用何种 CSP 策略。
*/
export const setRefererMeta = () => {
	const meta = document.createElement('meta')
	meta.name = 'referrer'
	meta.content = 'unsafe-URL'
	document.head.appendChild(meta)
}

/**
 * 判断是否为函数
 * @param {function} fn
 */
export const isFunction = (fn) => {
	try {
		return typeof fn === "function";
	} catch (err) {
		console.err(err);
		return false;
	}
}

/**
 * @description 检测一个变量是否是数组并且不为空
 * @param arr
 * @returns {boolean}
 */
export const isArrayEmpty = (arr) => {
	return Array.isArray(arr) && arr.length > 0
}

/**
 * 下载js文件工具函数
 * @param {js文件路径} urlArr
 */
export const loadJs = (urlArr) => {
	try {
		let promises = [];
		isArrayEmpty(urlArr) && urlArr.forEach(url => {
			const promise = new Promise(function (resolve, reject) {
				const script = document.createElement('script');
				script.src = url;
				document.body.appendChild(script);
				script.onload = function () {
					resolve();
				}
				script.onerror = function () {
					reject();
				}
			});
			promises = [...promises, promise];
		});
		return Promise.all(promises);
	} catch (error) {
		console.error("JS异常：", error);
	}
}

// 获取cookie信息
export const getCookie = (cookiename) => {
	let arr,
		reg = new RegExp('(^| )' + cookiename + '=([^;]*)(;|$)')
	if (!document.cookie) return ''
	if ((arr = document.cookie.match(reg))) {
		return decodeURIComponent(arr[2])
	} else {
		return ''
	}
}

/* 判断环境 */
export const environment = () => {
	const u = navigator.userAgent
	const wbApp = getCookie('58ua')
	const gjApp = u.toLowerCase().match(/ganji/i) ? true : false
	return {
		webKit: u.indexOf('AppleWebKit') > -1,
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		weiXin: u.indexOf('MicroMessenger') > -1,
		qqNews: u.indexOf('qqnews') > -1,
		weiBo: u.indexOf('weibo') > -1,
		qq: u.indexOf('QQ') > -1,
		wuBa: wbApp.length > 0,
		ganJi: gjApp,
		zcm: u.indexOf('bangjob') > -1 ||
			u.indexOf('bangJob') > -1 ||
			u.indexOf('zcm_brand') > -1
	}
}

/* 检查是不是最新的微信 */
export const isNewWX = () => {
	let useragent = navigator.userAgent
	let versionstr = useragent.match(/MicroMessenger\/(\d|\.)*/)
	if (versionstr) {
		let versions = versionstr[0].split('/')[1].split('.')
		if (versions[0] > 6) return true
		else if (versions[1] > 5) return true
		else if (versions[2] > 16) return true
	}
	return false
}

/* 在58、赶集中判断是否安装了招才猫 */
export const isInstallZcm = (callback = function () {}) => {
	window.WBAPP &&
		window.WBAPP.action &&
		window.WBAPP.action.isInstallApp &&
		window.WBAPP.action.isInstallApp({
				urlschema: 'bangjob://',
				package: 'com.wuba.bangjob'
			},
			callback
		)
}

//一般来说，我们使用URL：包括一个根路由，query等
//所以，我们就需要拼接一个完整的url
export const connectUrl = (data) => {
	let url = ''
	for (let k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}` //使用的es6的模板字符串的用法 ${}
	}
	return url ? url.substring(1) : '' //这里主要判断data是否为空
}

// 埋点key 防抖操作
export const debounceFn = (fn, delay) => {
	let timer
	return function () {
		// 保存函数调用时的上下文和参数，传递给 fn
		let context = this
		let args = arguments
		// 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
		clearTimeout(timer)
		// 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
		// 再过 delay 毫秒就执行 fn
		timer = setTimeout(function () {
			fn.apply(context, args)
		}, delay)
	}
}