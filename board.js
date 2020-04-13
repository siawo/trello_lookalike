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
			boardLists = this.boardLists = document.createElement('div'),
			titleEle = this.titleEle = document.createElement('div'),
			titleText = this.titleText = document.createTextNode(json.title),
			addListEle = this.addListEle = document.createElement('div'),
			addListText = this.addListText = document.createTextNode('+ Add a list');

		titleEle.setAttribute('contenteditable', true);

		container.classList.add('board-layout');
		boardLists.classList.add('board-lists');
		titleEle.classList.add('board-title');
		addListEle.classList.add('add-list');

		addListEle.addEventListener('click', () => this.addList());

		titleEle.appendChild(titleText);
		addListEle.appendChild(addListText);
		boardLists.appendChild(addListEle);
		container.appendChild(titleEle);
		container.appendChild(boardLists);

		if (Array.isArray(json.lists)) {
			json.lists.forEach(obj => {
				if (isObject(obj)) {
					this.addList(obj);
				}
			});
		}

		document.body.appendChild(container);
	}
	addList(obj) {
		const list = new List(obj);
		this.lists.push(list);
		this.boardLists.insertBefore(list.getlist(), this.boardLists.lastChild);
	}
	removeList() {

	}
}
export default Board;