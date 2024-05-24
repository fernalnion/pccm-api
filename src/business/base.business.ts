import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FilterQuery, Model } from 'mongoose';

export class BaseBusiness<T> {
  collectionModel: Model<T>;
  constructor(model: Model<T>) {
    this.collectionModel = model;
  }

  create = (payload: T) => this.collectionModel.create(payload);
  getById = (id: string) =>
    this.collectionModel.findOne({ _id: new ObjectId(id) });
  getItem = (filter: FilterQuery<any>) =>
    this.collectionModel.findOne({ ...(filter ?? {}) });
  getAll = (filter?: FilterQuery<any>) =>
    this.collectionModel.find({ ...(filter ?? {}) });
  deleteById = (id: string) =>
    this.collectionModel.deleteOne({ _id: new ObjectId(id) });
  updateById = (id: string, payload: Partial<T>) =>
    this.collectionModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...payload } },
    );

  isExits = async (filter: FilterQuery<any>) => {
    const item = await this.getItem(filter);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  };
}
