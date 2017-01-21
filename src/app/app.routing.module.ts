import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [  
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent }
];

export const appRoutingProviders: any[] = [
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);