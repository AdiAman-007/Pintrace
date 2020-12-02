import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatefgComponent } from './manufacturer/createfg/createfg.component';
import { CreatepoComponent } from './manufacturer/createpo/createpo.component';
import { DashboardComponent } from './manufacturer/dashboard/dashboard.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ViewfgComponent } from './manufacturer/viewfg/viewfg.component';
import { ViewpoComponent } from './manufacturer/viewpo/viewpo.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierdashboardComponent } from './supplier/supplierdashboard/supplierdashboard.component';
import { ViewposupplierComponent } from './supplier/viewposupplier/viewposupplier.component';

import { MaunfacturerGuardGuard } from './_helpers/maunfacturer-guard.guard';
import { SupplierGuard } from './_helpers/supplier.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'manufacturer',
    component: ManufacturerComponent,
    canActivate: [MaunfacturerGuardGuard],
    children: [
      {
        path: '',
        redirectTo: '/manufacturer/dashboard',
        pathMatch: 'full'
      },
      {path:'dashboard', component: DashboardComponent},
      {path:'createpo', component: CreatepoComponent},
      {path:'createfg', component: CreatefgComponent},
      { path: 'po/:poid', component: ViewpoComponent},
      { path: 'fg/:productid', component: ViewfgComponent},
    ]
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    canActivate: [SupplierGuard],
    children: [
      {path:'dashboard', component: SupplierdashboardComponent},
      { path: 'po/:poid', component: ViewposupplierComponent},
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
