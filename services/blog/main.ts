import { Elysia } from "elysia";
import MongoClient from "@learning/connectors/clients/mongo.client";
import { Schema } from "mongoose";

const app = new Elysia()
  .get("/", async () => {
    const instance = await MongoClient.init(
      "mongodb://root:password@localhost:27017",
    );

    const BlogSchema = new Schema({
      title: {
        type: String,
        required: true,
      },
    });

    const BlogModel = instance.model("Blog", BlogSchema);

    const BlogDoc = new BlogModel();

    BlogDoc.title = "hello world";

    await BlogDoc.save();
  })
  .listen({
    hostname: "0.0.0.0",
    port: 3000,
  });

console.log(`Listening on ${app.server!.url}`);
