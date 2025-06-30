import { Elysia } from "elysia";
import MongoClient from "@learning/connectors/clients/mongo.client";
import { Schema } from "mongoose";
import BlogService from "./services/blog.service";
import { BlogDTO } from "./dto/blog.dto";
import BlogRepository from "./repositories/blog.repository";

const app = new Elysia()
	.get("/", async () => {
		const blogRepo = await BlogRepository.init();

		const blogService = new BlogService(blogRepo);

		const blog = new BlogDTO();

		blog.title = "Hello World";

		await blogService.createBlog(blog);
	})
	.listen({
		hostname: "0.0.0.0",
		port: 3000,
	});

console.log(`Listening on ${app.server!.url}`);
