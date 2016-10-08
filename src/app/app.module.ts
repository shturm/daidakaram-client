import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CategoryPanelComponent } from './category-panel/category-panel.component';
import { CategoryService } from './category.service';
import { AuthService } from './auth.service';

@NgModule({
	declarations: [
		AppComponent,
		CategoryPanelComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [CategoryService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
