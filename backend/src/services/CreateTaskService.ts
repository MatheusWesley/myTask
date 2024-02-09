import prismaClient from "../prisma";

interface CreateTaskProps {
  title: string,
  description: string,
  priority: string,
  status: boolean
}

export class CreateTaskService {
  async execute({ title, description, priority }: CreateTaskProps) {
    if (!title || !description || !priority) {
      throw new Error("Algum campo não foi preenchido");
    }
    const task = await prismaClient.task.create({
      data:{
        title,
        description,
        priority,
        status: false
      }
    })

    return task;
  }

}