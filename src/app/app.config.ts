import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import routes from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/guards/auth.guard';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from "./store/reducers/product.reducers";
import { ProductEffects } from "./store/effects/product.effects";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from "./store/reducers/cart.reducers";
import { CartEffects } from "./store/effects/cart.effects";
import { authReducer } from "./store/reducers/auth.reducers";
import { AuthEffects } from "./store/effects/auth.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    AuthGuard,
    provideStore({products: productReducer, cart: cartReducer, auth: authReducer}),
    provideEffects(ProductEffects, CartEffects, AuthEffects),
    provideStoreDevtools({maxAge: 25,}),
  ]
};
