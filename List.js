import Card from './card.js'
class List {
	constructor (headerText = 'To Do') {
		let container = this.conatiner = document.createElement('div'),
			header = this.header = document.createElement('div'),
			addCardEle = this.addCardEle = document.createElement('div'),
			headerTextEle = this.headerTextEle = document.createTextNode(headerText),
			addCardText = this.addCardText = document.createTextNode('+ Add another card');

		container.classList.add('list');
		header.classList.add('list-header');
		addCardEle.classList.add('card-add');

		header.setAttribute('contenteditable', true);
		
		header.appendChild(headerTextEle);
		addCardEle.appendChild(addCardText);
		container.appendChild(header);
		container.appendChild(addCardEle);

		addCardEle.addEventListener('click', () => this.addCard());

		document.body.appendChild(container);
	}
	addCard () {
		let card = new Card ();
		this.conatiner.insertBefore(card.getCard(), this.addCardEle);
	}
}
export default List;