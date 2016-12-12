import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
	selector: 'app-category-panel',
	templateUrl: './category-panel.component.html',
	styleUrls: ['./category-panel.component.css']
})
export class CategoryPanelComponent implements OnInit {

	@Input() category: Category;
	@Output() onDelete = new EventEmitter<Category>();

	expand: boolean = false;
	subCategoriesThrehold: number = 13;
	// updateMode: boolean = false;

	constructor(private categoryService: CategoryService) { }

	ngOnInit() {
	}

	addSubCategory(name: string) {
		let subCategory = new Category(name, 0);
		// subCategory.parent = {id: this.category.id};
		subCategory.parent = new Category(null, this.category.id);

		this.category.subCategories.push(subCategory);
		this.categoryService.update(this.category).then((updatedCategory)=>{
			this.category = updatedCategory;
		});
	}

	updateCategory(c: Category) {
		this.categoryService.update(c).then((updatedCategory)=>{
			c = updatedCategory;
		});
	}

	updateSubCategory(c: Category) {
		c.parent = new Category(null, this.category.id);
		this.categoryService.update(c).then((updatedCategory)=>{
			c = updatedCategory;
		});
	}

	deleteCategory(c: Category) {
		if (c.subCategories.length > 3) {
			if (!confirm(`Изтриване на ${c.name} и всички ${c.subCategories.length} подкатегории и техните продукти ?`)) {
				return;
			}
		}

		this.categoryService.delete(c).then(()=>{
			this.onDelete.emit(this.category);
		});
	}

	toggleUpdateMode(c: Category) {
		c.updateMode = !c.updateMode;
	}

	subCategories(c: Category): Array<Category> {
		if (this.expand) return c.subCategories;
		return c.subCategories.slice(0, this.subCategoriesThrehold);
	}

	showExpandButton() {
		return this.category.subCategories.length > this.subCategoriesThrehold;
	}

}