import { Routes } from '@angular/router';
import { HomeComponent } from './products/pages/home/home.component';
import { ProductDetailsComponent } from './products/pages/product-details/product-details.component';
import { EditProductComponent } from './products/pages/edit-product/edit-product.component';
import { CartPageComponent } from './cart/pages/cart-page/cart-page.component';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

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