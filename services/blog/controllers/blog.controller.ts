import BlogService from "../services/blog.service";

export default class BlogController {
	constructor(private readonly blogService: BlogService) {}

	async createBlog(blogData: any) {
		try {
			const blog = await this.blogService.createBlog(blogData);
			return { success: true, data: blog };
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}
}
