import { isObject, updateText } from './utils.js';
import Card from './card.js';

const noCardString = '+ Add a card',
	addedCardString = '+ Add another card',
	defaultElementCount = 2;

/**
 * class List
 */
class List {
	constructor(json = { header: 'To Do' }) {
		// throw error if input is not object
		if (!isObject(json)) {
			throw new Error('List input shoudd be an Object');
		}
		let listContainer = this.listContainer = document.createElement('div'),
			container = this.container = document.createElement('div'),
			headerContainer = this.headerContainer = document.createElement('div'),
			header = this.header = document.createElement('div'),
			addCardEle = this.addCardEle = document.createElement('div'),
			headerTextEle = this.headerTextEle = document.createTextNode(json.header || 'To Do'),
			addCardText = this.addCardText = document.createElement('p'),
			xImg = this.editImage = document.createElement('img');

		addCardText.innerText = noCardString;

		// add classes
		listContainer.classList.add('list-container');
		container.classList.add('list');
		headerContainer.classList.add('list-header-container');
		header.classList.add('list-header');
		addCardEle.classList.add('card-add');

		// adding respective attributes
		header.setAttribute('contenteditable', true);
		xImg.setAttribute('src', './assets/image/x.png');
		xImg.setAttribute('height', '10px');
		xImg.setAttribute('width', '10px');
		
		xImg.style.display = 'none';
		xImg.style.cursor = 'pointer';

		// connet the dom
		header.appendChild(headerTextEle);
		headerContainer.appendChild(header);
		headerContainer.appendChild(xImg);
		addCardEle.appendChild(addCardText);
		container.appendChild(headerContainer);
		container.appendChild(addCardEle);
		listContainer.appendChild(container);

		// add cards based on input
		if (Array.isArray(json.cards)) {
			json.cards.forEach(obj => {
				if (isObject(obj)) {
					this.addCard(obj);
				}
			});
		}

		// attach event listeners
		addCardEle.addEventListener('click', () => this.addCard());
		xImg.addEventListener('click', () => this.removeList());
		container.addEventListener('mouseover', () => xImg.style.display = 'block');
		container.addEventListener('mouseout', () => xImg.style.display = 'none');
		listContainer.addEventListener('dragover', (e) => this.dragOver(e));
		listContainer.addEventListener('drop', (e) => this.drop(e));
	}

	/**
	 * api to create and add card element in dom
	 * @param {String} info 
	 */
	addCard(info = { content: '' }) {
		let card = new Card(info);
		this.container.insertBefore(card.getCard(), this.container.lastChild);
		updateText(this.container, noCardString, addedCardString, defaultElementCount);
	}
	/**
	 * api to prevent default action of Resetting the current drag operation to none
	 * @param {Object} e event for drag over 
	 */
	dragOver(e) {
		e.preventDefault();
	}
	/**
	 * api to return the root of list container
	 */
	getlist() {
		return this.listContainer;
	}
	/**
	 * api to handle the drop event and move the element in the correct position
	 * @param {Object} e drop event 
	 */
	drop(e) {
		e.preventDefault();
		let sourceEle = document.getElementById(e.dataTransfer.getData("text/plain")),
			sourceList = sourceEle.parentElement,
			targetEle = e.target,
			targetList,
			targetCrad;

		if (targetEle.className === 'list-container') {
			targetList = targetEle.firstChild;
		} else if (targetEle.className === 'list-header' || targetEle.className === 'card-add') {
			targetList = targetEle.parentElement;
		} else if (targetEle.className === 'list') {
			targetList = targetEle;
		} else {
			targetCrad = e.target.id ? e.target : e.target.parentElement;
			targetList = targetCrad.parentElement;
		}

		// position the source element in the drop target
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

		// update the text of the list
		updateText(sourceList, noCardString, addedCardString, defaultElementCount);
		updateText(targetList, noCardString, addedCardString, defaultElementCount);
	}

	/**
	 * api to remove the list
	 */
	removeList () {
		this.listContainer.remove();
	}
}
export default List;