import amqp from "amqplib";

const QUEUE_NAME = "blog";
(async () => {
  const connection = await amqp.connect("amqp://admin:admin@localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME);

  console.log("Waiting for queue...");

  channel.consume(QUEUE_NAME, (msg: any) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
})();
