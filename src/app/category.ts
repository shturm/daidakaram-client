export class Category {
	public id: number;
	public name?: string;
	public subCategories?: Array<Category>;
	public parent?: Category;
	public updateMode?: boolean = false;
	
	
	constructor(name: string = null, id: number) {
		this.name = name;
		if (id > 0) {
			this.id = id;
		}
	}

}
