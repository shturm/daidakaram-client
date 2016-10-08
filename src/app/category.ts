export class Category {
	public id: number;
	public name?: string;
	public subCategories?: Array<Category>;
	public parent?: Category;

	public updateMode?: boolean = false;
	
	constructor(name: string) {
		this.name = name;
	}
}
