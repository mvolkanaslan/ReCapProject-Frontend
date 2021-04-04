import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { RentComponent } from './components/rent/rent.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DatePipe } from '@angular/common';
import { CreditCardNumberPipe } from './pipes/credit-card-number.pipe';
import { RentalComponent } from './components/rental/rental.component';
import { ToastrModule } from 'ngx-toastr';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    BrandComponent,
    NaviComponent,
    CarDetailsComponent,
    FilterComponent,
    FilterPipePipe,
    RentComponent,
    PaymentComponent,
    CreditCardNumberPipe,
    CarManagementComponent,
    BrandManagementComponent,
    ColorManagementComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
