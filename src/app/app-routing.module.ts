import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { CarComponent } from './components/car/car.component';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'cardetails/:carId', component: CarDetailsComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'payment/:rental', component: PaymentComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'carmanage', component: CarManagementComponent },
  { path: 'brandmanage', component: BrandManagementComponent },
  { path: 'colormanage', component: ColorManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
