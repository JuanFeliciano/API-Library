import { fastify } from "fastify";
import { prisma } from "./prisma";

const app = fastify();

app.get("/", async (request, reply) => {
  const albook = await prisma.library.findMany();

  reply.status(200).send(albook);
});

app.post("/library", async (request, reply) => {
  const { title, pages, theme } = (await request.body) as {
    title: string;
    pages: number;
    theme: string;
  };

  const newbook = await prisma.library.create({
    data: { title, pages, theme },
  });
  reply.status(201).send(newbook);
});

app.put("/library/:id", async (request, reply) => {
  const { id } = (await request.params) as {
    id: string;
  };
  const { title, pages, theme } = (await request.body) as {
    title: string;
    pages: number;
    theme: string;
  };

  const upbook = await prisma.library.update({
    where: {
      id: id,
    },
    data: { title, pages, theme },
  });
  reply.status(200).send(upbook);
});

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("app running on port 3000");
  });
