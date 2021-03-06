import { Category } from './category';

export class Product {
	id: number;
	sku: string;
	name: string;
	price: number;
	categoryName: string;
	categoryId: number;
	compatibilityStatus: string = 'SETTINGS'; // or NA, UNKNOWN
	compatibilitySettings: Array<{
		id: string,
		make: string,
		model: string,
		variant:string,
		productId: number}>;

	// constructor() {
	// 	this.compatibilitySettings = [
	// 		{id: 'F6A6D2B5-BDE0-4624-851F-4FDA808497D6', make: 'BMW', model: '3 Series', variant: 'E30'},
	// 		{id: '2D7B5CB1-80FF-41AC-AC9B-56F4A76E604B', make: 'BMW', model: '3 Series', variant: 'E46'},
	// 		{id: 'D91AE2A5-26D4-4979-86E5-1BC69CB8B538', make: 'VW', model: 'GOLF', variant: 'MK IV'},
	// 	];
	// }

}
