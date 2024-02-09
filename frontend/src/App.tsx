import { useEffect, useState, useRef, FormEvent} from 'react';
import { FaTrash } from 'react-icons/fa';
import { api } from './services/api';

interface TaskProps {
  id: string,
  title: string,
  description: string,
  priority: string,
  status: boolean
}

export function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([])
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const prioritynRef = useRef<HTMLSelectElement | null>(null)

  useEffect(() => {
    loadTasks()
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    setTasks(response.data);

  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault();

   // if (!titleRef.current?.value || descriptionRef.current?.value) return;

    const response = await api.post("/task", {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      priority: prioritynRef.current?.value
    })
    setTasks(allTasks => [...allTasks, response.data])
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/task/", {
        params: {
          id
        }
      })
      const allTasks = tasks.filter( (task) => task.id !== id)
      setTasks(allTasks);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl bg-slate-800 rounded-md">
        <div className="max-w-md mx-auto my-8">
          <h1 className="text-4xl font-medium text-gray-100 my-5">Tarefas</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="titulo" className="block text-gray-200 font-medium mb-2">
                Título
              </label>
              <input
                type="text"
                id="titulo"
                className="w-full p-2 border rounded"
                placeholder="Digite um titulo aqui.."
                ref={titleRef}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descricao" className="block text-gray-200 font-medium mb-2">
                Descrição
              </label>
              <textarea
                id="descricao"
                className="w-full p-2 border rounded"
                ref={descriptionRef}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="prioridade" className="block text-gray-200 font-medium mb-2">
                Prioridade
              </label>
              <select
                id="prioridade"
                className="w-full p-2 border rounded"
                ref={prioritynRef}
              >
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
            <input type="submit" value={'Nova Tarefa'} className=" bg-indigo-600 font-medium hover:bg-indigo-700 transition-colors text-gray-50 p-2 rounded cursor-pointer" />
          </form>

          {tasks.map( (task) => (
            <section key={task.id} className="relative bg-slate-200 p-4 mt-5 mb-4 rounded-lg shadow-md hover:scale-105 duration-150">
              <button
              className="absolute top-0 right-0 p-2 text-gray-600 hover:text-pink-500"
              onClick={ () => handleDelete(task.id) }
              >
                <FaTrash />
              </button>

              <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="mb-4">
                <span className="text-gray-700 font-semibold">Prioridade:</span> {task.priority}
                <span className="ml-2 text-gray-700 font-semibold">Status:</span> {task.status ? "Concluido" : "Pendente"}
              </div> 
            </section>
          ))}

        </div>

      </main>
    </div>
  )
}