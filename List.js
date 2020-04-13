import { isObject } from './utils.js';
import Card from './card.js';

class List {
	constructor(json = {
		header: 'To Do'
	}) {
		if (!isObject(json)) {
			throw new Error('List input shoudd be an Object');
		}
		let container = this.conatiner = document.createElement('div'),
			header = this.header = document.createElement('div'),
			addCardEle = this.addCardEle = document.createElement('div'),
			headerTextEle = this.headerTextEle = document.createTextNode(json.header || 'To Do'),
			addCardText = this.addCardText = document.createTextNode('+ Add another card');

		container.classList.add('list');
		header.classList.add('list-header');
		addCardEle.classList.add('card-add');

		header.setAttribute('contenteditable', true);

		header.appendChild(headerTextEle);
		addCardEle.appendChild(addCardText);
		container.appendChild(header);
		container.appendChild(addCardEle);

		if (Array.isArray(json.cards)) {
			json.cards.forEach(obj => {
				if (isObject(obj)) {
					this.addCard(obj);
				}
			});
		}

		addCardEle.addEventListener('click', () => this.addCard());
		container.addEventListener('dragover', (e) => this.dragOver(e));
		container.addEventListener('drop', (e) => this.drop(e));
	}
	addCard(info = {
		content: ''
	}) {
		let card = new Card(info);
		this.conatiner.insertBefore(card.getCard(), this.conatiner.lastChild);
	}
	dragOver(e) {
		e.preventDefault();
	}
	getlist() {
		return this.conatiner;
	}
	drop(e) {
		e.preventDefault();
		let sourceEle = document.getElementById(e.dataTransfer.getData("text/plain")),
			sourceList = sourceEle.parentElement,
			targetEle = e.target,
			targetList,
			targetCrad;
		if (targetEle.className === 'list-header' || targetEle.className === 'card-add') {
			targetList = targetEle.parentElement;
		} else if (targetEle.className === 'list') {
			targetList = targetEle;
		} else {
			targetCrad = e.target.id ? e.target : e.target.parentElement;
			targetList = targetCrad.parentElement;
		}
		if (targetCrad) {
			if (targetList !== sourceList) {
				targetList.insertBefore(sourceEle, targetCrad);
			} else {
				let children = Array.from(targetList.children),
					targetIndex = children.indexOf(targetCrad),
					sourceIndex = children.indexOf(sourceEle),
					[e1, e2] = targetIndex > sourceIndex ? [targetCrad, sourceEle] : [sourceEle, targetCrad];
				targetList.insertBefore(e1, e2);
			}
		} else {
			targetList.insertBefore(sourceEle, targetList.lastChild);
		}
	}
}
export default List;