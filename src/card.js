import { getId } from './utils.js';
/**
 * class Card
 */
class Card {
	constructor(info = { content: '' }) {
		// create element
		let container = this.container = document.createElement('div'),
			editableDiv = this.editableDiv = document.createElement('div'),
			editSign = this.editSign = document.createElement('div'),
			textNode = this.textNode = document.createTextNode(info.content || ''),
			img = this.editImage = document.createElement('img');

		// add classes
		container.classList.add('card');
		editableDiv.classList.add('editable-area');
		editSign.classList.add('edit-sign');

		// setting the required attributes
		container.setAttribute('draggable', true);
		container.setAttribute('id', getId());
		img.setAttribute('src', './assets/image/edit.png');
		img.setAttribute('height', '15px');
		img.setAttribute('width', '15px');
		// stopped default dragging of image
		img.setAttribute('draggable', 'false');

		editSign.style.display = 'none';

		//attcah the childrens
		editableDiv.appendChild(textNode);
		editSign.appendChild(img);
		container.appendChild(editableDiv);
		container.appendChild(editSign);

		// add events
		img.addEventListener('click', () => this.enableEditing());
		editableDiv.addEventListener('blur', () => this.disableEditing());
		container.addEventListener('mouseover', () => editSign.style.display = 'block');
		container.addEventListener('mouseout', () => editSign.style.display = 'none');
		container.addEventListener('dragstart', (e) => this.dragStart(e));
	}

	/**
	 * enable the editing and stops dragging
	 */
	enableEditing() {
		this.editableDiv.setAttribute('contenteditable', true);
		this.container.setAttribute('draggable', false);
	}

	/**
	 * disable the editing and stops dragging
	 */
	disableEditing() {
		this.editableDiv.setAttribute('contenteditable', false);
		this.container.setAttribute('draggable', true);
	}

	/**
	 * api to returns the root container of card
	 */
	getCard() {
		return this.container;
	}

	/**
	 * api to set the id of the element being dragged
	 * @param {Object} e drag event 
	 */
	dragStart(e) {
		e.dataTransfer.setData("text/plain", this.container.getAttribute('id'));
	}
}
export default Card;