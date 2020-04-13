// count for creating id
let count = 0;
/**
 * api to check if the paramenter is object
 */
const isObject = obj => typeof obj === 'object' && obj !== null,
	/**
	 * updates the text with the given strings based
	 * on the length attribute
	 */
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
	/**
	 * created a string using count
	 */
	getId = () => {
		return `el-${count++}`;
	}

export {
	isObject,
	updateText,
	getId
}