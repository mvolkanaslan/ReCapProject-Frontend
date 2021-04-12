import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarListComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/brand/:brandId', component: CarListComponent },
  { path: 'cars/color/:colorId', component: CarListComponent },
  { path: 'rentals', component: RentalComponent, canActivate: [AdminGuard] },
  { path: 'cardetails/:carId', component: CarDetailsComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarListComponent },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'payment', component: PaymentComponent, canActivate: [LoginGuard] },
  {
    path: 'carmanage',
    component: CarManagementComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'brandmanage',
    component: BrandManagementComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'colormanage',
    component: ColorManagementComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
