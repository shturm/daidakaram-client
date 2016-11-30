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

	getBodies(make: string, model: string): Promise<Array<string>> {
		if (!make) return Promise.reject("Invalid make");
		if (!model) return Promise.reject("Invalid model");

		return new Promise((resolve, reject) => {
			let url: string = env.apiUrl + 'compatibility/getBodies?make=' + make + "&model=" + model;

			this.http.get(url).toPromise().then(result => {
				resolve(result.json());
			}, error => {
				reject(error);
			});
		});
	}

	getYearFrom(make: string, model: string): Promise<number> {
		if (!make) return Promise.reject("Invalid make");
		if (!model) return Promise.reject("Invalid model");

		return new Promise((resolve, reject) => {
			let url: string = env.apiUrl + 'compatibility/getYearFrom?make=' + make + "&model=" + model;

			this.http.get(url).toPromise().then(result => {
				resolve(result.json());
			}, error => {
				reject(error);
			});
		});
	}

	getYearTo(make: string, model: string): Promise<number> {
		if (!make) return Promise.reject("Invalid make");
		if (!model) return Promise.reject("Invalid model");

		return new Promise((resolve, reject) => {
			let url: string = env.apiUrl + 'compatibility/getYearTo?make=' + make + "&model=" + model;

			this.http.get(url).toPromise().then(result => {
				resolve(result.json());
			}, error => {
				reject(error);
			});
		});
	}

	getTypes(make: string, model: string): Promise<Array<string>> {
		if (!make) return Promise.reject("Invalid make");
		if (!model) return Promise.reject("Invalid model");

		return new Promise((resolve, reject) => {
			let url: string = env.apiUrl + 'compatibility/getTypes?make=' + make + "&model=" + model;

			this.http.get(url).toPromise().then(result => {
				resolve(result.json());
			}, error => {
				reject(error);
			});
		});
	}
}
