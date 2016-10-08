import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryPanelComponent } from './category-panel/category-panel.component';
import { CategoryService } from './category.service';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';


@NgModule({
	declarations: [
		AppComponent,
		CategoryPanelComponent,
		ProductListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [CategoryService, AuthService, ProductService],
	bootstrap: [AppComponent]
})
export class AppModule { }
