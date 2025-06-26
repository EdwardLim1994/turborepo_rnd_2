import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

export default class MongoClient {
  private static _instance?: Mongoose | null = null;
  private constructor() {}

  public static async init(url: string) {
    if (!MongoClient._instance) {
      MongoClient._instance = await mongoose.connect(url);
    }

    return MongoClient._instance;
  }
}
