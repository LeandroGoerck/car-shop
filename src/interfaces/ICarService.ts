import { Car } from './CarInterface';
import { IService } from './IService';

export interface ICarService extends IService<Car> {
  create(obj: Car): Promise<Car>;
  read(): Promise<Car[]>;
  readOne(_id: string): Promise<Car | null>;
  update(_id: string, obj: Car): Promise<Car | null>;
  delete(_id: string): Promise<Car | null>;
}