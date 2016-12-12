import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryPanelComponent } from './category-panel/category-panel.component';
import { CategoryService } from './category.service';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { CompatibilityService } from './compatibility.service';

import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
	declarations: [
		AppComponent,
		CategoryPanelComponent,
		ProductListComponent,

		LoginComponent,
		CategoriesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [CategoryService, AuthService, ProductService, CompatibilityService],
	bootstrap: [AppComponent]
})
export class AppModule { }
