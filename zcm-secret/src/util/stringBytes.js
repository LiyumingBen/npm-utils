/**
 * 字符串转 byte 数组方法
 * @param {需要转撑byte数组的字符串} str
 */

export const  stringToByte = (str)  => {
	var bytes = new Array()
	var len, c
	len = str.length
	for (var i = 0; i < len; i++) {
		c = str.charCodeAt(i)
		if (c >= 0x010000 && c <= 0x10ffff) {
			bytes.push(((c >> 18) & 0x07) | 0xf0)
			bytes.push(((c >> 12) & 0x3f) | 0x80)
			bytes.push(((c >> 6) & 0x3f) | 0x80)
			bytes.push((c & 0x3f) | 0x80)
		} else if (c >= 0x000800 && c <= 0x00ffff) {
			bytes.push(((c >> 12) & 0x0f) | 0xe0)
			bytes.push(((c >> 6) & 0x3f) | 0x80)
			bytes.push((c & 0x3f) | 0x80)
		} else if (c >= 0x000080 && c <= 0x0007ff) {
			bytes.push(((c >> 6) & 0x1f) | 0xc0)
			bytes.push((c & 0x3f) | 0x80)
		} else {
			bytes.push(c & 0xff)
		}
	}
	return bytes
}

export const byteToString = (arr) => {
	if (typeof arr === 'string') {
		return arr
	}
	var str = '',
		_arr = arr
	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/)
		if (v && one.length == 8) {
			var bytesLength = v[0].length
			var store = _arr[i].toString(2).slice(7 - bytesLength)
			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2)
			}
			str += String.fromCharCode(parseInt(store, 2))
			i += bytesLength - 1
		} else {
			str += String.fromCharCode(_arr[i])
		}
	}
	return str
}
