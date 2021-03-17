import { CarImage } from './carImages';

export interface Car {
  carId: number;
  brandId: number;
  colorId: number;
  carName: string;
  brandName: string;
  colorName: string;
  dailyPrice: number;
  modelYear: number;
}
