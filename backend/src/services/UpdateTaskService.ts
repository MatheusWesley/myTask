import prismaClient from "../prisma";

interface UpdateTaskProps {
  id: string;
  task: {
    title: string,
    description: string,
    priority: string,
    status: boolean
  }
}

export class UpdateTaskService {
  async execute({ id , task}: UpdateTaskProps) {

    if (!id) {
      throw new Error("ID não informado");
    }

    const findTask = await prismaClient.task.findFirst({
      where: {
        id,
      }
    })

    if (!findTask) {
      throw new Error("Tarefa não existe ou id informado está invalido");
    }
    await prismaClient.task.update({
      where: {
        id: findTask.id
      },
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      }
    });
    return { message: "Tarefa atualizada com sucesso!!!" }
  }
}