import { Injectable } from '@angular/core';
import { Product } from './product';

import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import {environment as env} from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

	constructor(private http: Http) { }

	getPage(pageNumber: number): Promise<Array<Product>> {
		return new Promise((resolve, reject) => {
			this.http.get(env.apiUrl+'product?pageNumber='+pageNumber).toPromise()
			.then(products => {
				resolve(products.json());
			}, error => {
				this.handleError(error);
			});
		});
	}

	handleError(error: any) {
		console.log(error);
	}
}
