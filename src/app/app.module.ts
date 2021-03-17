import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { HttpClientModule } from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    BrandComponent,
    NaviComponent,
    CarDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
