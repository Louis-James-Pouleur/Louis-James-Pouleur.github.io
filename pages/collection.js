export default class Collection {
	constructor() {
		this.user = "Louis-James";
		this.roster = [];
	}

	describe() {
		let images = [];

		this.roster.forEach((p) => images.push(p.imageId));
		return `Image added to ${this.user}`;
	}

	addToCollection(p) {
		this.roster.push(p);
	}
}
//code not done, no time left :/
