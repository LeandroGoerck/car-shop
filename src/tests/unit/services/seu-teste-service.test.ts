import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarService from '../../../services/CarService';
import { Model } from 'mongoose';
import mocks from '../mocks/mocks';
import CarModel from '../../../models/CarModel';
import MongoModel from '../../../models/MongoModel';
import { Car, CarSchema } from '../../../interfaces/CarInterface';

describe('Test CarService Layer', () => {

  describe('Can create a new Car', () => {
    before(() => { sinon.stub(Model, 'create').resolves(mocks.oneCar) })

    after(() => { (Model.create as SinonStub).restore() })

    it('resolves the created car object', async () => {
      const carService = new CarService();
      const createdCar = await carService.create(mocks.carBody);
      expect(createdCar).to.be.deep.equal(mocks.oneCar);
    })
  })

  describe('Cannot create a new Car with wrong object', () => {
    before(() => { sinon.stub(CarSchema, 'safeParse').resolves(null) })

    after(() => { (CarSchema.safeParse as SinonStub).restore() })

    it('returns a zod error', async () => {
      const carService = new CarService();
      const response = await carService.create(mocks.carBodyWithMissingField as Car);
      expect(response).to.haveOwnProperty('error');
    })
  })

  describe('Can get all Cars', () => {
    before(() => { sinon.stub(Model, 'find').resolves(mocks.allCars) })

    after(() => { (Model.find as SinonStub).restore() })

    it('resolves the correct car object', async () => {
      const carService = new CarService();
      const createdCar = await carService.read();
      expect(createdCar).to.be.deep.equal(mocks.allCars);
    })
  })

  describe('Can get One Car by Id', () => {
    before(() => { sinon.stub(Model, 'findOne').resolves(mocks.oneCar) })

    after(() => { (Model.findOne as SinonStub).restore() })

    it('resolves the correct car object', async () => {
      const carService = new CarService();
      const createdCar = await carService.readOne(mocks.carId);
      expect(createdCar).to.be.deep.equal(mocks.oneCar);
    })
  })

  describe('Cannot get One Car with a wrong Id', () => {
    before(() => { sinon.stub(Model, 'findOne').resolves({ "error": "Internal Server Error" }) })

    after(() => { (Model.findOne as SinonStub).restore() })

    it('returns Internal Server Error', async () => {
      const carService = new CarService();
      const response = await carService.readOne('wrongId');
      expect(response).to.be.deep.equal({ "error": "Internal Server Error" });
    })
  })

  describe('Can update One Car by Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndUpdate').resolves(mocks.oneCar) })
  
      after(() => { (Model.findOneAndUpdate as SinonStub).restore() })
  
      it('Can delete One Car by Id', async () => {
        const carService = new CarService();
        const updatedCar = await carService.update(mocks.carId, mocks.carBody);
        expect(updatedCar).to.be.deep.equal(mocks.oneCar);
      })
    })

  describe('Cannot update a Car with wrong Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndUpdate').resolves(null) })
  
      after(() => { (Model.findOneAndUpdate as SinonStub).restore() })
  
      it('returns null', async () => {
        const carService = new CarService();
        const response = await carService.update('wrongID', mocks.carBody);
        expect(response).to.be.null;
      })
    })

    describe('Can delete One Car by Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndDelete').resolves(mocks.oneCar) })
  
      after(() => { (Model.findOneAndDelete as SinonStub).restore() })
  
      it('resolves the correct car object', async () => {
        const carService = new CarService();
        const updatedCar = await carService.delete(mocks.carId);
        expect(updatedCar).to.be.deep.equal(mocks.oneCar);
      })
    })

    describe('Cannot delete One Car with wrong Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndDelete').resolves(null) })
  
      after(() => { (Model.findOneAndDelete as SinonStub).restore() })
  
       it('returns null', async () => {
        const carService = new CarService();
        const updatedCar = await carService.delete('wrongId');
        expect(updatedCar).to.be.null;
      })
    })

})