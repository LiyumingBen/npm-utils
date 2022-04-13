import axios from 'axios'
import CryptoJS from 'crypto-js'
import {
	getSymmetryPassword,
	getUuid,
	getUid,
	getCookie
} from './util'

/**
 *
 * @param {Function} method 请求方法
 * @returns
 */
const http_secret_zcm = (obj) => {
	const {
		url = '',
			params = {},
			req = null,
			g_config = {}
	} = obj
	/* 
	  	处理请求参数
	 */
	let config = {}
	let symmetryPassword = ''
	try {
		// 设置header信息
		const zpVersion = getCookie('zp-version', req) || '0.0.0'
		config = {
			contentType: 'form',
			headers: {
				'zp-version': zpVersion,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}
		// 如果是服务端渲染，将node服务接收的request对象中的cookie携带
		if (typeof window === 'undefined' && req) {
			config.headers = {
				...config.headers,
				Cookie: req.headers.cookie
			}
		}
		config.withCredentials = true

		// 获取UUID
		const uuid = getUuid()
		// 获取对称加密密钥
		symmetryPassword = getSymmetryPassword()

		// 加密过程
		const {
			cmd,
			...others
		} = params || {}
		// 对hbody加密
		let hbody =
			Object.keys(others).length == 0 ?
			JSON.stringify({
				uuid
			}) :
			JSON.stringify(others)
		hbody = CryptoJS.AES.encrypt(
			hbody,
			CryptoJS.enc.Utf8.parse(symmetryPassword), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			}
		).toString()

		// 通过对一个由uuid,hbody,cmd,key,index等参数组成的字符串进行摘要，生成签名
		const sign = CryptoJS.MD5(
			`${params.cmd}&hbody=${hbody}&uuid=${uuid}&index=h5&h5`
		).toString()

		// 两次encode规则
		hbody = encodeURIComponent(hbody)
		hbody = encodeURIComponent(hbody)
		const requestBody = {
			hbody,
			uuid,
			sign,
			cmd,
			key: 'h5',
			index: 'h5'
		}

		if (getUid(req).length > 0) {
			requestBody.uid = getUid(req)
		}

		let formData = ''
		for (let key in requestBody) {
			formData += `${key}=${requestBody[key]}&`
		}

		config = {
			...config,
			data: formData,
			method: 'post',
			url,
			...g_config
		}
	} catch (error) {
		console.error('参数处理异常:', error)
		throw error
	}

	/*
		请求
	*/
	return new Promise((resolve, reject) => {
		try {
			axios(config).then((res) => {
					//  解密过程
					let {
						result = '',
					} = res.data || {}
					if (typeof result == 'string') {
						result = CryptoJS.AES.decrypt(
							result,
							CryptoJS.enc.Utf8.parse(symmetryPassword), {
								mode: CryptoJS.mode.ECB,
								padding: CryptoJS.pad.Pkcs7
							}
						).toString(CryptoJS.enc.Utf8)

						if (result === '') {
							res.data.result = {}
						} else {
							res.data.result = JSON.parse(result)
						}
					}
					resolve(res.data || {})
				})
				.catch((err) => {
					reject(err)
				})

		} catch (error) {
			console.error('JS异常:', error)
			reject(error)
		}
	})
}

export default {
	http_secret_zcm,
	getUid
}