/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Event } from "../../service/Event/type";
import { mockUsers } from "../../mock/mockUsers";
import { useNavigate, useParams } from "react-router-dom";
import findEventById from "../../service/Event/findEventById";
import editEvent from "../../service/Event/editEvent";

const initialValues = {
  name: "",
  description: "",
  userId: mockUsers[1].id,
  activityId: "",
  autoFrequency: false,
  date: "",
  endDate: "",
  startDate: "",
};

const UpdateEvent = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formValues, setFormValues] = useState<
    Omit<Event, "id" | "status" | "createdAt" | "updatedAt" | "usersList"> & {
      date: string;
    }
  >(initialValues);

  const handleUpdateEvent = async (e: any) => {
    e.preventDefault();

    try {
      const data = await editEvent(id!, {
        ...formValues,
      });

      console.log("Editado: ", data);

      setFormValues(initialValues);
      redirectToMainPage();
    } catch (error) {
      console.error("Erro ao editar evento:", error);
    }
  };

  const redirectToMainPage = () => {
    navigate(`/professor`);
  };

  const fetchData = useCallback(async () => {
    if (id) {
      const data = await findEventById(id);
      const {
        createdAt,
        updatedAt,
        usersList,
        id: eventId,
        ...formData
      } = data;
      setFormValues({ ...formData });
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <div className="mb-10 items-start w-1/2 ml-20">
          <h2 className="text-4xl mb-2">Editar evento</h2>
          <p>Preencha todas as informações sobre o evento abaixo.</p>
        </div>

        <div>
          <form onSubmit={handleUpdateEvent}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mb-6 p-2 border-2 rounded-md border-gray-300 w-80"
                />
                <input
                  type="text"
                  placeholder="Categoria do evento"
                  value={formValues.activityId}
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
                    value={formValues.date}
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
                    value={formValues.startDate}
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
                    value={formValues.endDate}
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
                  value={formValues.description}
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
                  checked={formValues.autoFrequency}
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
                  Editar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
