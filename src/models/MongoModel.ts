import { Model as M, Document, isValidObjectId } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected _modelMongoose: M<T & Document>) { }

  create = async (obj: T): Promise<T> => this._modelMongoose.create({ ...obj });

  read = async (): Promise<T[]> => this._modelMongoose.find();

  readOne = async (id: string): Promise<T | null> =>
    this._modelMongoose.findOne({ _id: id });

  update = async (id: string, obj: T): Promise<T | null> => {
    if (!isValidObjectId(id)) return null;
    const result = await this._modelMongoose
      .findOneAndUpdate(
        { _id: id },
        { entity: obj },
        { returnOriginal: false },
      );
    return result;
  };

  delete = async (id: string): Promise<T | null> => {
    if (!isValidObjectId(id)) return null;
    const result = await this._modelMongoose.deleteOne({ _id: id });
    return result as T | null;
  };
}

export default MongoModel;