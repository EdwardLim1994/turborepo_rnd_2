import { BlogModel } from "../models/blog.model";
import { BlogDTO } from "../dto/blog.dto";
import MongoClient from "@learning/connectors/clients/mongo.client";

export default class BlogRepository {
	private constructor(private readonly blogModel: BlogModel) {}

	public static async init() {
		return new BlogRepository(
			new BlogModel(
				await MongoClient.init(
					"mongodb://root:password@localhost:27017"
				)
			)
		);
	}

	public async create(data: BlogDTO) {
		const blogDocument = this.blogModel.model;
		blogDocument.title = data.title!;
		return await blogDocument.save();
	}
}
