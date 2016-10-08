import { Component, OnInit, Input } from '@angular/core';
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
		for (let i = this.pageNumber-1; i > 0 && i >= this.pageNumber - pageSetLength/2; i--) {
			result.push(i);
		}
		result.push(this.pageNumber);
		for (let i = this.pageNumber+1; i <= this.pageNumber+pageSetLength/2; i++) {
			result.push(i);
			latestAdded = i;
		}
		while (result.length < pageSetLength) {
			result.push(latestAdded++);
		}
		result.sort((a,b) => a-b);

		return result;
	}

	goToPage(pageNumber: number) {
		this.pageNumber = pageNumber;
		this.productService.getPage(pageNumber).then((products) => {
			this.products = products;
		});
	}

}
