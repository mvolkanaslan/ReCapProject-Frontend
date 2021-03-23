import { CarInfo } from './carInfo';
import { CarImage } from './carImages';

export interface CarDetails {
  car: CarInfo;
  carImages: CarImage[];
}
