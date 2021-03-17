import { Car } from './car';
import { CarImage } from './carImages';

export interface CarDetails {
  car: Car;
  carImages: CarImage[];
}
