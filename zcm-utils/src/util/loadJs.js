export const loadJs = (src) => {
	if (url && url !== '') {
		return new Promise(function (resolve, reject) {
			const script = document.createElement('script')
			script.src = src
			document.body.appendChild(script)
			script.onload = function () {
				resolve()
			}
			script.onerror = function () {
				reject()
			}
		})
	}
}
