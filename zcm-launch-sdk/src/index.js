import {
	setRefererMeta,
	loadJs,
	environment,
	isNewWX,
	isInstallZcm,
	isFunction
} from './util'
import { WX58CONFIG, WXJSSDK } from './configs'
import {
	getJsonpData
} from './apis/http'

const IOSURL = 'https://apps.apple.com/cn/app/%E6%8B%9B%E6%89%8D%E7%8C%AB%E7%9B%B4%E8%81%98-58%E5%90%8C%E5%9F%8E%E6%8B%9B%E8%81%98%E5%95%86%E5%AE%B6%E7%89%88/id1016820238'
const ANDROIDVERSION = '6.23.2'

/* 获取招才猫版本信息 */
const getZcmInfo = async () => {
	const URL = 'https://zcmoperation.58.com/zcm/operation/api/web/config'
	let params = {
		url: URL,
		data: {},
		options: {
			param: "jsonp"
		}
	}
	try {
		await getJsonpData(params)
			.then((res) => {
				try {
					const {
						code = -1, data = {}
					} = res || {}
					if (code * 1 === 0) {
						console.log('招才猫版本获取正常：', data)
						const {
							android_version = '', ios_url = ''
						} = data || {}
						return {
							androidV: android_version || ANDROIDVERSION, // Android版本
							iosURL: ios_url || IOSURL // IOS app store
						}
					}
				} catch (error) {
					console.error('js异常：', error)
					throw error
				}
			})
			.catch((err) => {
				console.error('服务异常：', err)
				throw err
			})
	} catch (error) {
		console.error('异常：', error)
		throw error
	}
}

/* 组装数据 */
const dealUrl = async (channel) => {
	const {
		androidV = '', iosURL = ''
	} = await getZcmInfo() || {}
	const androidURL =
		location.protocol.indexOf('s') > -1 ?
		`https://sdl.58cdn.com.cn/bangbang/setup/bangjob/${ androidV || ANDROIDVERSION }/58zhaopin_job_${ channel || '0' }.apk` :
		`http://dl.58cdn.com.cn/bangbang/setup/bangjob/${ androidV || ANDROIDVERSION }/58zhaopin_job_${ channel || '0' }.apk`
	return {
		iosURL: iosURL || IOSURL,
		androidURL: androidURL
	}
}

/* 浏览器唤起招才猫 */
const browserOpenZcm = (params) => {
	const {
		iosURL,
		androidURL,
		schema,
		zcmLaunchCallback,
		zcmDownCallback
	} = params || {}
	let downloadApp = null
	const {
		ios = false, android = false
	} = environment() || {}

	window.location.href = schema

	clearTimeout(downloadApp)
	downloadApp = setTimeout(() => {
		if (
			document.hidden ||
			document.webkitHidden ||
			document.visibilityState == 'hidden'
		) {
			console.log("浏览器唤起招才猫")
			isFunction(zcmLaunchCallback) && zcmLaunchCallback();
			clearTimeout(downloadApp)
		} else {
			console.log("浏览器下载招才猫")
			isFunction(zcmDownCallback) && zcmDownCallback();
			clearTimeout(downloadApp)
			if (ios) {
				window.location.href = iosURL
			} else if (android) {
				window.location.href = androidURL
			}
		}
	}, 2500)
}

/* 58、赶集app唤起招才猫 */
const appGJ58OpenZcm = (params) => {
	const {
		iosURL,
		androidURL,
		schema,
		zcmLaunchCallback,
		zcmDownCallback
	} = params || {}
	isInstallZcm((is_install) => {
		console.log("赶集、58中是否安装招才猫：", is_install)
		if (parseInt(is_install) === 0) {
			console.log("赶集、58中安装招才猫， 唤起招才猫")
			//安装了招才猫app
			isFunction(zcmLaunchCallback) && zcmLaunchCallback();
			window.WBAPP &&
				window.WBAPP.action.openApp &&
				window.WBAPP.action.openApp({
					urlschema: schema,
					package: 'com.wuba.bangjob',
					maincls: 'com.wuba.bangjob.common.login.activity.LaunchActivity'
				})
		} else {
			const {
				ios = false, android = false
			} = environment() || {}
			let realURL = ''
			if (ios) {
				realURL = iosURL
			} else if (android) {
				realURL = androidURL
			}
			console.log("赶集、58中未安装招才猫， 下载招才猫")
			//未安装招才猫app
			isFunction(zcmDownCallback) && zcmDownCallback();
			window.WBAPP &&
				window.WBAPP.action.installApp &&
				window.WBAPP.action.installApp(realURL, 'browser')
		}
	})
}

/* 微信唤起招才猫 */
const wxOpenZcm = (params) => {
	const {
		iosURL,
		androidURL,
		schema,
		zcmLaunchCallback,
		zcmDownCallback
	} = params || {}
	const {
		ios = false, android = false
	} = environment() || {}
	if (isNewWX()) {
		console.log("最新微信：", isNewWX());
		loadJs([WXJSSDK,WX58CONFIG]).then(() => {
			console.log("js资源加载完成！");
			try {
				wx.ready(function () {
					wx.invoke("launchApplication", {
							"appID": "wx181e479197e91c6b", //微信开放平台上招才猫移动应用的appid：wx181e479197e91c6b
							"extInfo": schema,
							"parameter": encodeURIComponent(decodeURIComponent(schema))
						},
						function (res) {
							if (!(res.err_msg && res.err_msg.indexOf("launchApplication:ok") > -1)) {
								//未安装app跳下载
								console.log("微信中未安装招才猫， 下载招才猫")
								isFunction(zcmDownCallback) && zcmDownCallback();
								if (ios) {
									window.location.href = iosURL
								} else if (android) {
									window.location.href = androidURL
								}
							} else {
								//已经安装招才猫app，拉起
								console.log("微信中安装招才猫， 唤起招才猫")
								isFunction(zcmLaunchCallback) && zcmLaunchCallback();
								console.log("launchApplication:ok");
							}
						});
				});
			} catch (err) {
				console.error("JS异常：", err);
			}
		}).catch((err) => {
			console.error("JS文件加载异常：", err);
		});
	} else {
		browserOpenZcm(iosURL, androidURL, schema);
	}
}
/**
 * @param { string }   schema             唤起招才猫的协议
 * @param { string }   channel            渠道号
 * @param { function } zcmDownCallback    下载招才猫回调
 * @param { function } zcmLaunchCallback  唤起招才猫回调
 */
const launchZCM = async (params = {}) => {
	// 微信设置meta属性
	setRefererMeta()
	const {
		schema = '', channel = '0', zcmDownCallback = function () {}, zcmLaunchCallback = function () {}
	} = params || {}
	const ch = channel || '0'
	const sch = schema || 'bangjob://zcmclient?rf=zcm_' + ch
	const {
		iosURL = '', androidURL = ''
	} = await dealUrl(ch) || {}

	const {
		wuBa = '', ganGi = '', weiXin = ''
	} = environment() || {}
	const obj = {
		iosURL,
		androidURL,
		schema: sch,
		ch,
		zcmDownCallback,
		zcmLaunchCallback
	}
	if (wuBa || ganGi) {
		console.log("环境：58、赶集")
		// 在58、赶集唤起
		appGJ58OpenZcm(obj)
	} else if (weiXin) {
		console.log("环境：微信")
		// 微信唤起
		wxOpenZcm(obj)
	} else {
		console.log("环境：浏览器")
		// 在浏览器唤起
		browserOpenZcm(obj)
	}
}

export default {
	launchZCM
}