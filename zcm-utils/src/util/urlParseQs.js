import { parse } from 'qs'
let inNode = typeof window === '' + void 0

/**
 *解析URL
 *params: 
	url: 需要解析的地址
 *return：
 	一个长度对象
 *其中scheme表示协议头，authority表示域名，path表示路径，query表示url中？后#之前的部分，fragment表示#后面的部分
 */

export const url_parse = (url = window.location.href) => {
	const reg = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/

	const arr = url.match(reg)

	return {
		scheme: arr[2],
		authority: arr[4],
		path: arr[5],
		query: parse(arr[7]),
		fragment: arr[9]
	}
}

/**
 *获取url中name的值
 *params: 
 	name: 需要解析的query中的字段
	url: 需要解析的地址
 *return:
 	val: url中name的值
 */

export const getQueryByName = (name, req) => {
	if (inNode && req) {
		return req.query[name] || undefined
	} else {
		const url = window.location.href
		const query = url_parse(url).query
		const val = query[name] || undefined
		return val
	}
}