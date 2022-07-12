import CustomRouter from './routes/Router';
import App from './app';

import CarController from './controllers/CarController';

import { Car } from './interfaces/CarInterface';
import CarService from './services/CarService';
import { ICarService } from './interfaces/ICarService';

const server = new App();

const carController = new CarController(new CarService() as ICarService);

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
