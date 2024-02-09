import { FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskService } from "../services/CreateTaskService"


export class CreateTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { title,description, priority, status } = request.body as {
      title: string,
      description: string,
      priority: string,
      status: boolean
    }

    const taskService = new CreateTaskService();
    const task = await taskService.execute({title, description, priority, status});
    reply.send(task);
  }

}