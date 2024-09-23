/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Event } from "../../service/Event/type";

const CreateEvent = () => {
  const [formValues, setFormValues] = useState<
    Omit<Event, "id" | "status" | "createdAt" | "updatedAt"> & { date: string }
  >({
    name: "",
    description: "",
    userId: "",
    activityId: "",
    autoFrequency: false,
    date: "",
    endDate: "",
    startDate: "",
  });
  const handleCreateEvent = (e: any) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full justify-center items-center">
        <div className="mb-10 items-start w-1/2 ml-20">
          <h2 className="text-4xl mb-2">Criar evento</h2>
          <p>Preencha todas as informações sobre o evento abaixo.</p>
        </div>

        <div>
          <form onSubmit={handleCreateEvent}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mb-6 p-2 border-2 rounded-md border-gray-300 w-80"
                />
                <input
                  type="text"
                  placeholder="Categoria do evento"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      activityId: e.target.value,
                    }))
                  }
                  className="ml-5 p-2 border-2 rounded-md border-gray-300 w-80"
                />
              </div>

              <div className="flex mb-6">
                <div className="flex flex-col">
                  <label>Data do evento:</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="p-2 border-2 rounded-md border-gray-300 w-52"
                  />
                </div>

                <div className="flex flex-col ml-5">
                  <label>Início:</label>
                  <input
                    type="time"
                    placeholder="startDate"
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="p-2 border-2 rounded-md border-gray-300 w-52"
                  />
                </div>

                <div className="flex flex-col ml-5">
                  <label>Fim:</label>
                  <input
                    type="time"
                    placeholder="endDate"
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="p-2 border-2 rounded-md border-gray-300 w-52"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Descrição do evento..."
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="p-2 border-2 rounded-md border-gray-300 w-full h-60"
                />
              </div>

              <div>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      autoFrequency: e.target.checked,
                    }))
                  }
                  className="accent-green-600"
                />
                <label className="ml-2">Lista de presença automática</label>
              </div>

              <div className="mt-10 flex w-full justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 w-20 rounded-md"
                >
                  Criar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
