import { Elysia } from "elysia";
import BlogService from "./services/blog.service";
import { BlogDTO } from "./dto/blog.dto";
import BlogRepository from "./repositories/blog.repository";
import BlogController from "./controllers/blog.controller";
/**
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
*/

import amqp from "amqplib";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

(() => {
  const PROTO_PATH = path.resolve(
    __dirname,
    "../../packages/models/protos/blog.proto",
  );

  const server = new grpc.Server();

  const loader = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const blogProto = grpc.loadPackageDefinition(loader).blog;

  server.addService(blogProto.Blogger.service, {
    GetBlog: async (call: any, callback: any) => {
      const connection = await amqp.connect("amqp://admin:admin@localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue("blog");

      const job = {
        id: Date.now(),
        task: "notification",
      };

      const msg = JSON.stringify(job);

      channel.sendToQueue("blog", Buffer.from(msg));

      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);

      callback(null, {
        title: "Hello from grpc " + call.request.name,
      });
    },
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err: any, response: any) => {
      console.log("GRPC server running");
      console.log(response);
      console.error(err);
    },
  );
})();
//console.log(`Listening on ${app.server!.url}`);
