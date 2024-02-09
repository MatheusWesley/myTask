import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTaskService } from "../services/DeleteTaskService"


export class DeleteTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.query as {id: string}

    const taskService = new DeleteTaskService();
    const task = taskService.execute({ id });

    reply.send(task);
  }
}