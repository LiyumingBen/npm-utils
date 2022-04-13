// 判断是不是在node环境中 如果是在node环境中  那么cookie只能在req.headers.cookie获取cookies
let inNode = typeof window === '' + void 0
/*
	cookiename    传入的cookie字段
	req           node中传入的req请求对象
*/
export const getCookie = (cookiename, req) => {
	let cookies

	if (inNode && req) {
		cookies = req.headers.cookie
	} else if (inNode && !req) {
		console.warn('cookie不存在')
	} else {
		cookies = document.cookie
	}

	let arr,
		reg = new RegExp('(^| )' + cookiename + '=([^;]*)(;|$)')
	if (!cookies) return ''
	if ((arr = cookies.match(reg))) {
		return unescape(arr[2])
	} else {
		return ''
	}
}
