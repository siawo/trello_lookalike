import { isObject } from './utils.js';
import List from './list.js';
class Board {
	constructor(json = {
		title: 'Welcome Board'
	}) {
		if (!isObject(json)) {
			new Error('Input should be a object');
		}
		this.lists = [];
		let container = this.container = document.createElement('div'),
			titleEle = this.titleEle = document.createElement('div'),
			titleText = this.titleText = document.createTextNode(json.title),
			addListEle = this.addListEle = document.createElement('div'),
			addListText;
		container.classList.add('board-layout');
		titleEle.classList.add('title');
		addListEle.classList.add('add-list');

		if (Array.isArray(json.lists)) {
			json.lists.forEach(obj => {
				if (isObject(obj)) {
					this.addList(obj);
				}
			});
		}
		addListText = this.addListText = document.createTextNode(this.lists.length
			? '+ Add another list'
			: '+ Add a list');

		addListEle.addEventListener('click', () => this.addList());

		titleEle.appendChild(titleText);
		addListEle.appendChild(addListText);
		container.appendChild(titleEle);
		container.appendChild(addListEle);
		document.body.appendChild(container);
	}
	addList(obj) {
		const list = new List(obj);
		this.lists.push(list);
		this.container.appendChild(list.getlist());
	}
	removeList() {

	}
}
export default Board;