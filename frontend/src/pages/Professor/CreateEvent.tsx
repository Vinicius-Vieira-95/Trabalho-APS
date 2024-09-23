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
      <div>
        <div>
          <h2>Criar evento</h2>
          <p>Preencha todas as informações sobre o evento abaixo.</p>
        </div>

        <div>
          <form onSubmit={handleCreateEvent}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="activityId"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      activityId: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <input
                  type="date"
                  placeholder="date"
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
                <input
                  type="time"
                  placeholder="startDate"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
                <input
                  type="time"
                  placeholder="endDate"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
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
                />
              </div>

              <div>
                <button type="submit">Criar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
