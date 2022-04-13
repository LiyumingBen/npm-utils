import jsonp from 'jsonp'
import { connectUrl } from '../util'


/**
 * 使用jsonp这个包，需要传递三个参数：
 * JSONP(url,options,fn)
 *  url: 获取数据的详细路由
 *  options: 参数 (可选参数)
 *  fn: 回调函数（是否成功获取数据，回调）
 */

//封装一个jsonp的函数
/**
 *
 * @param url: 根路径
 * @param data: 参数(相当于query)
 * @param options  选项（基本不用）
 * @returns {Promise<unknown>}   放回一个promise对象
 */
export const getJsonpData = (params) => {
	let { options = {}, url = '', data = {} } = params || {}
	//拼接字符串（根路径 + 参数）,看根路径是否包含 ‘？’
	url += (url.indexOf('?') < 0 ? '?' : '&') + connectUrl(data)

	return new Promise((resolve, reject) => {
		jsonp(url, options, (err, data) => {
			if (!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}
