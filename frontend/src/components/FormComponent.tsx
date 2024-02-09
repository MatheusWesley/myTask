// FormComponent.tsx
import React, { useState } from 'react';

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

const FormComponent: React.FC = () => {
  return (
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
  )
};

export default FormComponent;
