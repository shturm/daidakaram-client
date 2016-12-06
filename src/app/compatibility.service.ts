import { Injectable } from '@angular/core';
import { Product } from './product';

import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { environment as env } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompatibilityService {

	constructor(private http: Http) { }


	getMakes(): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			this.http.get(env.apiUrl + 'compatibility/getMakes').toPromise().then(makes => {
				resolve(makes.json());
			}, error => {
				reject(error);
			})
		});
	}

	getModels(make: string): Promise<Array<string>> {
		if (!make) return Promise.reject("Invalid make");

		return new Promise((resolve, reject) => {
			this.http.get(env.apiUrl + 'compatibility/getModels?make=' + make).toPromise().then(models => {
				resolve(models.json());
			}, error => {
				reject(error);
			})
		});
	}

	getVariants(make: string, model: string): Promise<Array<string>> {
		if (!make) return Promise.reject("Invalid make");
		if (!model) return Promise.reject("Invalid model");

		return new Promise((resolve, reject) => {
			let url: string = env.apiUrl + 'compatibility/getVariants?make=' + make + "&model=" + model;

			this.http.get(url).toPromise().then(variants => {
				resolve(variants.json());
			}, error => {
				reject(error);
			});
		});
	}

	createCompatibility(productId:number,
						make: string,
						model: string,
						variants: Array<string>): Promise<boolean> {
		let url: string = env.apiUrl + 'compatibility';
		let data = {
			productId: productId,
			make: make,
			model: model,
			variants: variants
		};
		return new Promise((resolve,reject) => {
			this.http.post(url, data).toPromise().then(() => {
				resolve(true);
			}, (error) => {
				reject(error);
			});
		});
	}

}
