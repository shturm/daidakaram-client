import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { environment as env } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

import { Category } from './category';

@Injectable()
export class CategoryService {

	constructor(private http: Http) { }

	getRootCategories(): Promise<Array<Category>> {
		let result = new Promise((resolve, reject) => {
			this.http.get(env.apiUrl + 'category/roots').toPromise()
				.then(cats => {
					let parsed = cats.json();
					for (let idx = 0; idx < parsed.length; idx++) {
						let c = parsed[idx];
						for (var scidx = 0; scidx < c.subCategories.length; scidx++) {
							let sc = c.subCategories[scidx];
							sc.parent = new Category(c.name, c.id);
						}
					}

					resolve(parsed);

				}, error => {
					this.handleError(error);
				})
		});
		return result;
	}

	addCategory(name: string): Promise<Category> {
		let c = new Category(name,0);
		let result = new Promise((resolve, reject) => {
			this.http.post(env.apiUrl + 'category', c).toPromise()
				.then((category) => {
					resolve(category.json());
				}, (error) => {
					this.handleError(error);
				});
		});
		return result;
	}

	update(c: Category): Promise<Category> {
		let result = new Promise((resolve, reject) => {
			this.http.put(env.apiUrl + 'category', c).toPromise()
				.then((category) => {
					resolve(category.json());
				}, (error) => {
					this.handleError(error);
				});
		});
		return result;
	}

	delete(c: Category): Promise<any> {
		let result = new Promise((resolve, reject) => {
			this.http.delete(env.apiUrl + 'category/delete/' + c.id, ).toPromise()
				.then(() => {
					resolve();
				}, (error) => {
					this.handleError(error);
				});
		});
		return result;
	}

	handleError(error: any) {
		try {
			console.error(error);
		} catch (e) {
			console.error('could not log to console an error. Attempting stringification');
			try {
				console.log(error.toString());
			} catch (e2) {
				console.error('could not stringify the error either');
			}
		}
	}
}
