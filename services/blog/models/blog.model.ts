import { Schema, Mongoose } from "mongoose";
import MongoModel from "@learning/connectors/utils/models/model.abstract";

const blogSchema = new Schema({
	title: {
		required: true,
		type: String,
	},
});

export class BlogModel extends MongoModel {
	constructor(instance: Mongoose) {
		super(instance);
	}

	public get model() {
		const modelInstance = this.instance.model("Blog", blogSchema);
		return new modelInstance();
	}
}
