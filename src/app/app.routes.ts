import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

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
    }
];

export default routes;