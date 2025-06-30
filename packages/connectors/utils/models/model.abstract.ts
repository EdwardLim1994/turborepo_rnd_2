import { Mongoose } from "mongoose";

export default abstract class MongoModel {
  private _instance: Mongoose;

  constructor(instance: Mongoose) {
    this._instance = instance;
  }

  protected get instance() {
    return this._instance;
  }
}
