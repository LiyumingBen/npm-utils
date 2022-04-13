export { getSymmetryPassword } from './secretPassword'
export { stringToByte, byteToString } from './stringBytes'
export { getCookie } from './cookie'
export { getUid } from './getUid'

import { v1 as uuidv1 } from 'uuid'
export const getUuid = () => {
	return uuidv1().replace(/\-/g, '')
}
