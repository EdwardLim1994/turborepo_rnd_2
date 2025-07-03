import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import Elysia from "elysia";
import yoga from "@elysiajs/graphql-yoga";

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
const typeDefs = /*GraphQL*/ `
type Blog{
  title: String
}

type Query{
getBlog: Blog
}
`;

(() => {
  new Elysia()
    .use(
      yoga({
        typeDefs,
        resolvers: {
          Query: {
            getBlog: () => {
              const client = new blog_proto.Blogger(
                "localhost:50051",
                grpc.credentials.createInsecure(),
              );

              return new Promise((resolve, reject) => {
                client.GetBlog({}, (err: any, response: any) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(response);
                  }
                });
              });
            },
          },
        },
      }),
    )
    .listen({
      hostname: "0.0.0.0",
      port: 3000,
    });
})();
