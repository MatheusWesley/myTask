import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateTaskService } from "../services/UpdateTaskService"


export class UpdateTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.query as {id: string}
    const { title,description, priority, status } = request.body as {
      title: string,
      description: string,
      priority: string,
      status: boolean
    };

    const task = {
      title,
      description,
      priority,
      status
    }

    const taskService = new UpdateTaskService();
    const taskUpdate = await taskService.execute( {id, task});
    reply.send(taskUpdate);
  }

}