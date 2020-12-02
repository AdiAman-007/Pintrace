import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AuthenticationService } from './_services/authentication.service';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { DashboardComponent } from './manufacturer/dashboard/dashboard.component';
import { CreatepoComponent } from './manufacturer/createpo/createpo.component';
import { CreatefgComponent } from './manufacturer/createfg/createfg.component';
import { MaunfacturerGuardGuard } from './_helpers/maunfacturer-guard.guard';
import { SupplierGuard } from './_helpers/supplier.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Chart1Component } from './manufacturer/chart1/chart1.component';
import { FilterPipe } from './_helpers/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewpoComponent } from './manufacturer/viewpo/viewpo.component';
import { SupplierService } from './_services/supplier.service';
import { SupplierdashboardComponent } from './supplier/supplierdashboard/supplierdashboard.component';
import { ViewposupplierComponent } from './supplier/viewposupplier/viewposupplier.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ViewfgComponent } from './manufacturer/viewfg/viewfg.component';
import { ProductfilterPipe } from './_helpers/productfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManufacturerComponent,
    SupplierComponent,
    DashboardComponent,
    CreatepoComponent,
    CreatefgComponent,
    Chart1Component,
    FilterPipe,
    ViewpoComponent,
    SupplierdashboardComponent,
    ViewposupplierComponent,
    ViewfgComponent,
    ProductfilterPipe,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    QRCodeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    MaunfacturerGuardGuard,
    SupplierGuard, 
    AuthenticationService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
