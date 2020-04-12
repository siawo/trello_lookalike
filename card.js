class Card {
	constructor(str = 'hello') {
		// create element
		let container = this.container = document.createElement('div'),
			editableDiv = this.editableDiv = document.createElement('div'),
			editSign = this.editSign = document.createElement('div'),
			textNode = this.textNode = document.createTextNode(str),
			img = this.editImage = document.createElement('img');

		// add classes
		container.classList.add('card');
		editableDiv.classList.add('editable-area');
		editSign.classList.add('edit-sign');

		container.setAttribute('draggable', true);
		img.setAttribute('src', './edit.png');
		img.setAttribute('height', '15px');
		img.setAttribute('width', '15px');

		editSign.style.display = 'none';

		//attcah the childrens
		editableDiv.appendChild(textNode);
		editSign.appendChild(img);
		container.appendChild(editableDiv);
		container.appendChild(editSign);
		document.body.appendChild(container);

		// add events
		img.addEventListener('click', () =>  this.enableEditing());
		editableDiv.addEventListener('blur', () =>  this.disableEditing());
		container.addEventListener('mouseover', () => editSign.style.display = 'block');
		container.addEventListener('mouseout', () => editSign.style.display = 'none');
	}
	enableEditing() {
		this.editableDiv.setAttribute('contenteditable', true);
		this.container.setAttribute('draggable', false);
	}
	disableEditing() {
		this.editableDiv.setAttribute('contenteditable', false);
		this.container.setAttribute('draggable', true);
	}

}
const card = new Card();
export default card;