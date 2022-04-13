import { url_parse } from './urlParseQs'
import { getCookie } from './getCookie'

let inNode = typeof window === '' + void 0

export const getUid = (req) => {
	// 如果是node环境的话，query直接从req中拿，不是的话，照旧
	const query = inNode && req ? req.query : url_parse().query
	const ppu = getCookie('PPU', req)
	const uidStr = ppu.split('&')[0]
	const uid = uidStr.split('=')[1] || getCookie('uid', req) || query.uid || ''
	return uid
}
