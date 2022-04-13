import { getCookie } from './getCookie'
// 判断是不是在node环境中 如果是在node环境中  那么ua只能在req.headers中获取
let inNode = typeof window === '' + void 0

export const getUA = (req) => {
	let u
	if (inNode && req) {
		u = req.headers['user-agent']
	} else {
		u = window.navigator.userAgent
	}
	const wubaapp = getCookie('58ua', req)
	const ganjiapp = u.toLowerCase().match(/ganji/i) ? true : false
	return {
		webKit: u.indexOf('AppleWebKit') > -1,
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		weixin: u.indexOf('MicroMessenger') > -1,
		txnews: u.indexOf('qqnews') > -1,
		sinawb: u.indexOf('weibo') > -1,
		qq: u.indexOf('QQ') > -1,
		wuba: wubaapp.length > 0,
		ganji: ganjiapp,
		zcm:
			u.indexOf('bangjob') > -1 ||
			u.indexOf('bangJob') > -1 ||
			u.indexOf('zcm_brand') > -1
	}
}
