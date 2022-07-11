import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model, isValidObjectId, Mongoose } from 'mongoose';
import mocks from '../mocks/mocks';

describe('Test CarModel Layer', () => {

  describe('Can create a new Car', () => {
    before(() => { sinon.stub(Model, 'create').resolves(mocks.carResolves) })

    after(() => { (Model.create as SinonStub).restore() })

    it('resolves the created car object', async () => {
      const carModel = new CarModel();
      const createdCar = await carModel.create(mocks.carBody);
      expect(createdCar).to.be.deep.equal(mocks.carResolves);
    })
  })

  describe('Can get One Car by Id', () => {
    before(() => { sinon.stub(Model, 'findOne').resolves(mocks.carResolves) })

    after(() => { (Model.findOne as SinonStub).restore() })

    it('resolves the correct car object', async () => {
      const carModel = new CarModel();
      const createdCar = await carModel.readOne(mocks.carId);
      expect(createdCar).to.be.deep.equal(mocks.carResolves);
    })
  })

  describe('Cannot get One Car with a wrong Id', () => {
    before(() => { sinon.stub(Model, 'findOne').resolves({ "error": "Internal Server Error" }) })

    after(() => { (Model.findOne as SinonStub).restore() })

    it('returns Internal Server Error', async () => {
      const carModel = new CarModel();
      const response = await carModel.readOne('wrongId');
      expect(response).to.be.deep.equal({ "error": "Internal Server Error" });
    })
  })

  describe('Can update One Car by Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndUpdate').resolves(mocks.carResolves) })
  
      after(() => { (Model.findOneAndUpdate as SinonStub).restore() })
  
      it('Can delete One Car by Id', async () => {
        const carModel = new CarModel();
        const updatedCar = await carModel.update(mocks.carId, mocks.carBody);
        expect(updatedCar).to.be.deep.equal(mocks.carResolves);
      })
    })

  describe('Cannot update a Car with wrong Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndUpdate').resolves(null) })
  
      after(() => { (Model.findOneAndUpdate as SinonStub).restore() })
  
      it('returns null', async () => {
        const carModel = new CarModel();
        const response = await carModel.update('wrongID', mocks.carBody);
        expect(response).to.be.null;
      })
    })

    describe('Can delete One Car by Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndDelete').resolves(mocks.carResolves) })
  
      after(() => { (Model.findOneAndDelete as SinonStub).restore() })
  
      it('resolves the correct car object', async () => {
        const carModel = new CarModel();
        const updatedCar = await carModel.delete(mocks.carId);
        expect(updatedCar).to.be.deep.equal(mocks.carResolves);
      })
    })

    describe('Cannot delete One Car with wrong Id', () => {
      before(() => { sinon.stub(Model, 'findOneAndDelete').resolves(null) })
  
      after(() => { (Model.findOneAndDelete as SinonStub).restore() })
  
       it('returns null', async () => {
        const carModel = new CarModel();
        const updatedCar = await carModel.delete('wrongId');
        expect(updatedCar).to.be.null;
      })
    })


})