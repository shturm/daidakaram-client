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
	private bodies: Array<string>;
	private yearFrom: number;
	private yearTo: number;
	private types: Array<string>;

	private make: string;
	private model: string;
	private chosenVariants: Array<string>;
	private chosenBodies: Array<string>;
	private chosenYearFrom: number;
	private chosenYearTo: number;
	private chosenTypes: Array<string>;

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

	submitProduct() {
		this.onSubmitProduct.emit(this.product);
		this.productService.updateProduct(this.product);
	}

	onMakeChange(make: string) {
		this.compatibilityService.getModels(make).then(models => {
			this.models = models;

			this.model = "";
			this.variants = this.chosenVariants = [];
			this.bodies = this.chosenBodies = [];
			this.types = this.chosenTypes = [];
			this.yearFrom = this.chosenYearFrom = 0;
			this.yearTo = this.chosenYearTo = 0;
		});
	}

	onModelChange(make: string, model: string) {
		this.compatibilityService.getVariants(make, model).then(variants => {
			this.variants = variants;
			this.chosenVariants = [];
			this.toggleAllVariants();
		});

		this.compatibilityService.getBodies(make, model).then(bodies => {
			this.bodies = bodies;
			this.chosenBodies = [];
			this.toggleAllBodies();
		});

		this.compatibilityService.getYearFrom(make, model).then(yearFrom => {
			this.yearFrom = this.chosenYearFrom = yearFrom;
		});

		this.compatibilityService.getYearTo(make, model).then(yearTo => {
			this.yearTo = this.chosenYearTo = yearTo;
		});

		this.compatibilityService.getTypes(make, model).then(types => {
			this.types = types;
			this.chosenTypes = [];
			this.toggleAllTypes();
		});
	}

	resetYears() {
		this.chosenYearFrom = this.yearFrom;
		this.chosenYearTo = this.yearTo;
	}

	updateVariant(v: string) {
		let idx = this.chosenVariants.indexOf(v);
		if (idx === -1) {
			this.chosenVariants.push(v);
		} else {
			this.chosenVariants.splice(idx,1);
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

	updateBody(b: string) {
		let idx = this.chosenBodies.indexOf(b);
		if (idx === -1) {
			this.chosenBodies.push(b);
		} else {
			this.chosenBodies.splice(idx,1);
		}
	}

	toggleAllBodies() {
		if (this.chosenBodies.length !== this.bodies.length) {
			this.chosenBodies = [];
			for (let i = 0; i < this.bodies.length; i++) {
				let b = this.bodies[i];
				this.chosenBodies.push(b);
			}
		} else {
			this.chosenBodies = [];
		}
	}

	updateType(t: string) {
		let idx = this.chosenTypes.indexOf(t);
		if (idx === -1) {
			this.chosenTypes.push(t);
		} else {
			this.chosenTypes.splice(idx,1);
		}
	}

	toggleAllTypes() {
		if (this.chosenTypes.length !== this.types.length) {
			this.chosenTypes = [];
			for (let i = 0; i < this.types.length; i++) {
				let t = this.types[i];
				this.chosenTypes.push(t);
			}
		} else {
			this.chosenTypes = [];
		}
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
