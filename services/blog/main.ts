import { Elysia } from "elysia";
import BlogService from "./services/blog.service";
import { BlogDTO } from "./dto/blog.dto";
import BlogRepository from "./repositories/blog.repository";
import BlogController from "./controllers/blog.controller";

const controllers = {
	blog: async () => {
		const blogRepo = await BlogRepository.init();
		const blogService = new BlogService(blogRepo);
		return new BlogController(blogService);
	},
};

const app = new Elysia()
	.get("/", async () => {
		const blog = new BlogDTO();
		blog.title = "Hello World";

		return await controllers.blog().then((context) => {
			return context.createBlog(blog);
		});
	})
	.listen({
		hostname: "0.0.0.0",
		port: 3000,
	});

console.log(`Listening on ${app.server!.url}`);
