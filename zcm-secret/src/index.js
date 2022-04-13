import CryptoJS from 'crypto-js'
import { getSymmetryPassword, getUuid, getUid } from './util'

/**
 *
 * @param {*} data 需要加密的参数
 * @returns
 */
const encode = (data = {}) => {
	try {
		// 获取UUID
		const uuid = getUuid()

		// 获取对称加密密钥
		const symmetryPassword = getSymmetryPassword()

		if (typeof data === 'string') {
			data = JSON.parse(data)
		}

		// 使用对称加密算法，生成对称加密密钥SEK，并用该密钥加密业务参数
		let hbody =
			Object.keys(data).length == 0
				? JSON.stringify({ uuid })
				: JSON.stringify(data)

		hbody = CryptoJS.AES.encrypt(
			hbody,
			CryptoJS.enc.Utf8.parse(symmetryPassword),
			{
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			}
		).toString()

		// 通过对一个由uuid,hbody,cmd,key,index等参数组成的字符串进行摘要，生成签名
		const { cmd = '' } = data || {}
		const sign = CryptoJS.MD5(
			`${cmd}&hbody=${hbody}&uuid=${uuid}&index=h5&h5`
		).toString()

		hbody = encodeURIComponent(hbody)
		hbody = encodeURIComponent(hbody)
		const requestBody = {
			hbody: hbody,
			sign,
			cmd,
			key: 'h5',
			index: 'h5',
			uuid
		}

		if (getUid(req).length > 0) {
			requestBody.uid = getUid(req)
		}

		return requestBody
	} catch (error) {
		console.error('encode error:', error)
		throw error
	}
}

// 服务端返回的数据result是由客户端传输的对称加密密钥SEK来加密的，所以客户端接收到返回数据之后，直接使用SEK解密即可
const decode = (data) => {
	try {
		//  解密过程(密文都必须是字符串)
		// 获取对称加密密钥
		const symmetryPassword = getSymmetryPassword()
		if (typeof data === 'string') {
			data = CryptoJS.AES.decrypt(
				data,
				CryptoJS.enc.Utf8.parse(symmetryPassword),
				{ mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
			).toString(CryptoJS.enc.Utf8)

			try {
				data = JSON.parse(data)
			} finally {
				return data
			}
		}
		return data
	} catch (error) {
		console.error('decode error:', error)
		throw error
	}
}

export default {
	encode,
	decode,
	getUid
}
