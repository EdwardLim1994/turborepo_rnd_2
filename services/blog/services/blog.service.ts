import BlogRepository from "../repositories/blog.repository";
import { BlogDTO } from "../dto/blog.dto";

export default class BlogService {
	constructor(private readonly _blogRepository: BlogRepository) {}

	public async createBlog(blog: BlogDTO) {
		try {
			return await this._blogRepository.create(blog);
		} catch (error: any) {
			console.error(error);
			throw new Error("Error creating blog");
		}
	}
}
