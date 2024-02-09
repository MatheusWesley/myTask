import prismaClient from "../prisma";

export class ListTasksService {
  async execute(){
    const tasks = await prismaClient.task.findMany();
    return tasks;
  }
}