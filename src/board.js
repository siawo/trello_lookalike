import { isObject, updateText } from './utils.js';
import List from './list.js';

const noListString = '+ Add a list',
	addedListString = '+ Add another list',
	defaultElementCount = 1;
class Board {
	constructor(json = {
		title: 'Welcome Board'
	}) {
		if (!isObject(json)) {
			new Error('Input should be a object');
		}
		let container = this.container = document.createElement('div'),
			boardLists = this.boardLists = document.createElement('div'),
			titleEle = this.titleEle = document.createElement('div'),
			titleText = this.titleText = document.createTextNode(json.title),
			addListEle = this.addListEle = document.createElement('div'),
			addListText = this.addListText = document.createElement('p');

		titleEle.setAttribute('contenteditable', true);
		addListText.innerText = noListString;

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

		// stopped drop effect in title
		titleEle.addEventListener('drop', e => e.preventDefault());
		titleEle.addEventListener('dragover', e => e.dataTransfer.effectAllowed = 'none');

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
		this.boardLists.insertBefore(list.getlist(), this.boardLists.lastChild);
		updateText(this.boardLists, noListString, addedListString, defaultElementCount);
	}
	removeList() {

	}
}
export default Board;