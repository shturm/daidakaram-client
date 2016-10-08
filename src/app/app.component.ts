import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'app works!';
	categories: Array<Category>;

	constructor(private categoryService: CategoryService) { }

	ngOnInit() {
		this.updateCategoryPanels();
	}

	addCategory(name: string) {
		this.categoryService.addCategory(name).then(() => {
			this.updateCategoryPanels();
		});
	}

	removeCategory(c: Category) {
		this.categories.forEach((cat: Category, idx: number) => {
			if (c.id == cat.id) {
				this.categories.splice(idx,1);
				return;
			}
		});
	}

	updateCategoryPanels() {
		this.categoryService.getRootCategories().then((cats)=>{
			this.categories = cats;
		});
	}
}
