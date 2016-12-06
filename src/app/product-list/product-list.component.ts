import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { CompatibilityService } from '../compatibility.service';
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

	private makes: Array<string>;
	private models: Array<string>;
	private variants: Array<string>;

	private chosenMake: string;
	private chosenModel: string;
	private chosenVariants: Array<string>;

	product: Product;

	constructor(private productService: ProductService,
				private categoryService: CategoryService,
				private compatibilityService: CompatibilityService) { }

	ngOnInit() {
		this.goToPage(this.pageNumber);
		this.categoryService.getRootCategories().then(categories => {
			this.categories = categories;
		});

		this.compatibilityService.getMakes().then(makes => {
			this.makes = makes;
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

	goToPage(pageNumber: number): Promise<any> {
		this.pageNumber = pageNumber;
		return this.productService.getPage(pageNumber).then((products) => {
			this.products = products;
		});
	}

	changeProductCategory(categoryId: number) {
		this.product.categoryId = categoryId;
		this.product.categoryName = this.getSubCategoryNameById(categoryId);
	}

	submitProduct() {
		this.onSubmitProduct.emit(this.product);
		this.productService.updateProduct(this.product);
	}

	onMakeChange(make: string) {
		this.compatibilityService.getModels(make).then(models => {
			this.models = models;

			this.chosenModel = '';
			this.variants = [];
			this.chosenVariants = [];
		});
	}

	onModelChange(make: string, model: string) {
		this.compatibilityService.getVariants(make, model).then(variants => {
			this.variants = variants;
			this.chosenVariants = [];
			this.toggleAllVariants();
		});
	}

	updateVariant(v: string) {
		let idx = this.chosenVariants.indexOf(v);
		if (idx === -1) {
			this.chosenVariants.push(v);
		} else {
			this.chosenVariants.splice(idx, 1);
		}
	}

	toggleAllVariants() {
		if (this.chosenVariants.length !== this.variants.length) {
			this.chosenVariants = [];
			for (let i = 0; i < this.variants.length; i++) {
				let v = this.variants[i];
				this.chosenVariants.push(v);
			}
		} else {
			this.chosenVariants = [];
		}
	}

	resetCompatibility() {
		this.chosenMake = '';
		this.chosenModel = '';
		this.chosenVariants = this.variants = [];
	}

	createCompatibility() {

		this.compatibilityService
		.createCompatibility(this.product.id, this.chosenMake, this.chosenModel, this.chosenVariants)
		.then(() 		=> this.goToPage(this.pageNumber).then(()=>{
			for (let i = 0; i < this.products.length; i++) {
				let p = this.products[i];
				if (p.id === this.product.id) {
					this.product = p;
					break;
				}
			}
		}),
			  (error) 	=> console.log(error));
	}

	private getSubCategoryNameById(subCategoryId: number): string {
		for (let i = 0; i < this.categories.length; i++) {
			let c = this.categories[i];
			for (let scidx = 0; scidx < c.subCategories.length; scidx++) {
				let sc = c.subCategories[scidx];
				if (sc.id === subCategoryId) {
					return sc.name;
				}
			}
		}
	}

}
