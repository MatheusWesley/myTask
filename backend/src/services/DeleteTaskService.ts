import prismaClient from "../prisma";

interface DeleteTaskProps {
  id: string;
}

export class DeleteTaskService {
  async execute({ id }: DeleteTaskProps){
    if (!id) {
      throw new Error ("ID não informado");
    }

    const findTask = await prismaClient.task.findFirst({
      where: {
        id,
      }
    })

    if (!findTask) {
      throw new Error ("Tarefa não existe ou id informado está invalido");
    }
    await prismaClient.task.delete({
      where: {
        id: findTask.id
      }
    })
    return {message: "Tarefa excluida com sucesso!!!"}
  }
}