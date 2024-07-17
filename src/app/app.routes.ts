import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';

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
        title: 'Edit Product Details Page'
    }
];

export default routes;