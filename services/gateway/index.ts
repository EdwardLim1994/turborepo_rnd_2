import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  __dirname,
  "../../packages/models/protos/blog.proto",
);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const blog_proto = grpc.loadPackageDefinition(packageDefinition).blog;

(() => {
  const client = new blog_proto.Blogger(
    "localhost:50051",
    grpc.credentials.createInsecure(),
  );

  client.GetBlog({}, (err: any, response: any) => {
    console.log("GRPC client is running");
    console.log(response);
    console.error(err);
  });
})();
