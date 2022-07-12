import { NextFunction, Request, Response } from "express";
import CarController from "../../../controllers/CarController";


import Sinon, * as sinon from 'sinon';
import chai from 'chai';
import mocks from '../mocks/mocks';
import { Model } from "mongoose";
import Service from "../../../services";
import CarService from "../../../services/CarService";
import { ICarService } from "../../../interfaces/ICarService";
import { Car } from "../../../interfaces/CarInterface";

class CarServiceMock implements ICarService {
  create = async (obj: Car): Promise<Car> => {
    return obj;
  };

  read = async (): Promise<Car[]> => [{}] as Car[];

  readOne = async (_id: string): Promise<Car> => {
    return {} as Car;
  };

  update = async (_id: string, obj: Car): Promise<Car> => {
    return {} as Car;
  };

  delete = async (_id: string): Promise<Car > => {
    return {} as Car;
  };
}


describe('Test Car Controller', () => {
  describe('can create a new Car', () => {
     const req = {} as Request;
     const res = {} as Response;
    //  const next = () => ({}) as NextFunction;

     before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.carBody;
     })

     it('Success', async () => {
      const carController = new CarController(new CarServiceMock());

      await carController.create(req, res);

      chai.expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      chai.expect((res.json as sinon.SinonStub).calledWith(mocks.carBody)).to.be.true;
     })
    })
})