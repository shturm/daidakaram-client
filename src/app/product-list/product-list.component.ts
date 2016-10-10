import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Product } from '../product';
import { Category } from '../category';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	@Input() pageNumber: number = 1;
	@Input() pageSize: number = 15;
	@Output() onSubmitProduct = new EventEmitter<Product>();
	private products: Array<Product>;
	private categories: Array<Category>;

	product: Product;

	constructor(private productService: ProductService,
							private categoryService: CategoryService) { }

	ngOnInit() {
		this.goToPage(this.pageNumber);
		this.categoryService.getRootCategories().then(categories => {
			this.categories = categories;
		});
	}

	// ordered page numbers available for navigation in header/footer
	getPageRange() {
		let result = [];
		let pageSetLength = 10;
		let latestAdded: number;
		this.pageNumber = parseInt(this.pageNumber.toString());

		// add before
		for (let i = this.pageNumber - 1; i > 0 && i >= this.pageNumber - pageSetLength / 2; i--) {
			result.push(i);
		}

		result.push(this.pageNumber);

		// add after
		for (let i = this.pageNumber + 1; i <= this.pageNumber + pageSetLength / 2; i++) {
			result.push(i);
			latestAdded = i;
		}

		while (result.length < pageSetLength) {
			result.push(latestAdded++);
		}
		result.sort((a, b) => a - b);

		return result;
	}

	goToPage(pageNumber: number) {
		this.pageNumber = pageNumber;
		this.productService.getPage(pageNumber).then((products) => {
			this.products = products;
		});
	}

	changeProductCategory(categoryId: number) {
		this.product.categoryId = categoryId;
		this.product.categoryName = this.getSubCategoryNameById(categoryId);
	}

	submitProduct(p: Product) {
		this.onSubmitProduct.emit(p);
		this.productService.updateProduct(p);
	}

	private getSubCategoryNameById(subCategoryId: number): string {
		for (let i = 0; i < this.categories.length; i++) {
			let c = this.categories[i];
			for (let scidx = 0; scidx < c.subCategories.length; scidx++) {
				let sc = c.subCategories[scidx];
				if (sc.id == subCategoryId) {
					return sc.name;
				}
			}
		}
	}

}
