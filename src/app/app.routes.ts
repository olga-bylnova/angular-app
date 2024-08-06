import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent,
        title: 'Product Details Page'
    },
    {
        path: 'product/edit/:id',
        component: EditProductComponent,
        canActivate: [AuthGuard],
        title: 'Edit Product Details Page'
    },
    {
        path: 'cart',
        component: CartPageComponent,
        title: 'Cart Page'
    },
    {
        path: 'auth',
        component: AuthPageComponent,
        title: 'Auth Page'
    }
];

export default routes;