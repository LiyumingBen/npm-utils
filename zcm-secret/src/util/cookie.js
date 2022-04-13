// 获取cookie
export const  getCookie = (key) => {
	if (key === undefined) return null
	let mReg = new RegExp('(^|;)\\s*' + key + '=([^;]*)(;|$)')
	let mValue = document.cookie.match(mReg)
	let ret = undefined

	if (mValue != null) {
		ret = unescape(mValue[2])
		if (ret !== undefined) {
			ret = ret.replace(/^\"|\'/i, '').replace(/\"|\'$/i, '') // 过滤字符串最外层引号
		}
	}
	return ret
}
