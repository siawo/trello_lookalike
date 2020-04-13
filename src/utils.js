let count = 0;
const isObject = obj => typeof obj === 'object' && obj !== null,
	updateText = (container, str1 = '', str2 = '', length) => {
		let ele = container.lastChild.firstChild,
			currText = ele.innerText;
		if (container.childNodes.length > length) {
			if (currText !== str2) {
				ele.innerText = str2;
			}
		} else {
			if (currText !== str1) {
				ele.innerText = str1;
			}
		}
	},
	getId = () => {
		return `el-${count++}`;
	}

export {
	isObject,
	updateText,
	getId
}