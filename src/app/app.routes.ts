import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
// import { AuthGuard, AdminGuard } from './auth.guard';

// import { NewProductPageComponent }      from './pages/newProduct/newProductPage.component';
// import { BrowsePageComponent }      from './pages/browse/browsePage.component';
// import { UsersPageComponent }      from './pages/users/usersPage.component';
// import { ProfilePageComponent } from './pages/profile/profilePage.component';
// import { RegisterPageComponent } from './pages/register/registerPage.component';
// import { LoginPageComponent } from './pages/login/loginPage.component';
// import { ProductDetailsPageComponent } from './pages/productDetails/productDetailsPage.component';

const appRoutes: Routes = [
    {path: '', component: ProductListComponent },
    {path: 'login', component: LoginComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'categories', component: CategoriesComponent},
    // {path: 'browse', component: BrowsePageComponent, canActivate: [AuthGuard]  },
    // {path: 'browse/search/:term', component: BrowsePageComponent, canActivate: [AuthGuard]  },
    // {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard, AdminGuard]  },
    // {path: 'new', component: NewProductPageComponent, canActivate: [AuthGuard, AdminGuard]  },
    // {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]  },
    // {path: 'register', component: RegisterPageComponent },
    // {path: 'login', component: LoginPageComponent },
    // {path: 'browse/:sku', component: ProductDetailsPageComponent, canActivate: [AuthGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
