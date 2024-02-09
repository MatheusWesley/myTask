import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskController } from "./controllers/CreateTaskController"
import { ListTasksController } from "./controllers/ListTasksController";
import { DeleteTaskController } from "./controllers/DeleteTaskController";
import { UpdateTaskController } from "./controllers/UpdateTaskController";

export async function routes( fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/tasks', async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListTasksController().handle(request, reply);
  });

  fastify.post('/task', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateTaskController().handle(request, reply)
  });

  fastify.put('/task/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateTaskController().handle(request, reply)
  });

  fastify.delete('/task/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteTaskController().handle(request, reply)
  });
}