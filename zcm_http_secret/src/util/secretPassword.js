import { stringToByte, byteToString } from './stringBytes'
import { encode as base64Encode } from 'js-base64'
import { v1 as uuidv1 } from 'uuid'

// 生成AES对称加密的密码
export const getSymmetryPassword = () => {
	const uuid = uuidv1().replace(/\-/g, '')
	const keyArr = stringToByte('2' + uuid)
	// aes加密的 password
	let password = keyArr.map((item, index) => {
		if (index % 3 == 2) {
			return item ^ 2
		}
		return item
	})
	password = byteToString(password)
	password = base64Encode(password)
	password = password.slice(0, 16)
	return password
}
