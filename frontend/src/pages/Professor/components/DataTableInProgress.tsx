import { useEffect, useState } from "react";
import { Event } from "../../../service/Event/type";
import GetEventsInProgress from "../../../service/Event/GetEventsInProgress";
import { Modal } from "../../../components/modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import PostTokenSignature from "../../../service/Event/PostTokenSignature";
import { QRCodeSVG } from "qrcode.react";
import { User } from "../../../models/interface";
import GetPresenceList from "../../../service/Event/GetPresenceList";
import PostFinishCourse from "../../../service/Event/PostFinishCourse";

const DataTableInProgress = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>();
  const [presenceLink, setPresenceLink] = useState<string>();
  const [eventIds, setEventIds] = useState<string[]>();
  const [users, setUsers] = useState<User[]>();

  const [timeQRCodeOpened, setTimeQRCodeOpened] = useState<number>();

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const data = await GetEventsInProgress();
        console.log("Dados retornados:", data);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Dados retornados não são um array", data);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleGenerateQRCode = async () => {
    if (!timeQRCodeOpened || !eventId) return;
    const token = (await PostTokenSignature(eventId, timeQRCodeOpened)).token;
    setPresenceLink(`http://localhost:5173/frequencia?token=${token}`);
    setEventIds([...(eventIds || []), eventId]);
    return;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModal2 = async () => {
    setOpenModal2(false);
  };

  const handleQRCodeTime = (event: SelectChangeEvent<number>): void => {
    setTimeQRCodeOpened(Number(event.target.value));
  };

  const fetchFrequencyList = async (eventId: string) => {
    const data = await GetPresenceList(eventId);
    console.log("Dados retornados:", data);
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("Dados retornados não são um array");
    }
  };

  const handleFinishCourse = async (eventId: string) => {
    await PostFinishCourse(eventId);
    return (window.location.href = "/professor");
  };

  return (
    <div className="flex flex-wrap gap-2 m-2">
      <Modal
        handleClose={handleCloseModal}
        title="Lista de frequência"
        open={openModal}
      >
        <div style={{ marginTop: 30 }}>
          <div className="text-sm" style={{ color: "637381" }}>
            Informe o tempo em que a lista de presença permanecerá aberta para
            que os alunos confirmem presença.
          </div>

          {presenceLink ? (
            <>
              <div className="my-10">
                <QRCodeSVG
                  width={"100%"}
                  height={"100%"}
                  value={presenceLink}
                />
              </div>
              <div className="flex gap-4 *:flex-1">
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  style={{
                    background: "#34C759",
                    textTransform: "initial",
                    height: 50,
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: 14 }}>Fechar</p>
                </Button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="my-10">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tempo para escanear QRCode
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeQRCodeOpened}
                    label="Tempo para escanear QRCode"
                    onChange={handleQRCodeTime}
                  >
                    <MenuItem value={2}>2 minutos</MenuItem>
                    <MenuItem value={10}>10 minutos</MenuItem>
                    <MenuItem value={20}>20 minutos</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-4 *:flex-1">
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  className="border border-gray-300"
                  style={{
                    background: "#ffff",
                    textTransform: "initial",
                    height: 50,
                  }}
                >
                  <p
                    style={{ fontWeight: "bold", fontSize: 14 }}
                    className=" text-gray-700"
                  >
                    Fechar
                  </p>
                </Button>{" "}
                <Button
                  onClick={handleGenerateQRCode}
                  variant="contained"
                  style={{
                    background: "#34C759",
                    textTransform: "initial",
                    height: 50,
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: 14 }}>
                    Gerar QRCode
                  </p>
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Modal
        handleClose={handleCloseModal2}
        title="Lista de frequência"
        open={openModal2}
      >
        <div style={{ marginTop: 30 }}>
          <div className="my-10">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-gray-200">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-200">
                    Presença
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <input
                        checked={user.attended} // Add this if you want to bind selected state
                        id={`checkbox-${user.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 *:flex-1">
            <Button
              onClick={handleCloseModal2}
              variant="contained"
              className="border border-gray-300"
              style={{
                background: "#ffff",
                textTransform: "initial",
                height: 50,
              }}
            >
              <p
                style={{ fontWeight: "bold", fontSize: 14 }}
                className=" text-gray-700"
              >
                Fechar
              </p>
            </Button>{" "}
            <Button
              onClick={handleCloseModal2}
              variant="contained"
              style={{
                background: "#34C759",
                textTransform: "initial",
                height: 50,
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: 14 }}>Salvar</p>
            </Button>
          </div>
        </div>
      </Modal>
      {events.map((event) => (
        <div className="shadow-lg w-72 rounded-lg p-9 flex justify-between flex-col">
          <div>
            <img
              src="../../img/uece-logocompleta.png"
              alt="Universidade Estadual do Ceará"
              className="mb-2 w-[20rem] mr-2"
            />
            <h1>{event.name}</h1>
            <span className="text-sm text-gray-600">{event.description}</span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                setOpenModal(true);
                setEventId(event.id);
              }}
              className="rounded-lg bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:green-blue-500"
            >
              Coletar presenças
            </button>
            <button
              onClick={async () => {
                handleFinishCourse(event.id);
              }}
              className="rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:red-blue-500"
            >
              Finalizar curso
            </button>
            {eventIds?.includes(event.id) && event.autoFrequency && (
              <button
                onClick={async () => {
                  setOpenModal2(true);
                  setEventId(event.id);
                  await fetchFrequencyList(event.id);
                }}
                className="rounded-lg bg-white hover:bg-white text-gray-700 font-bold py-2 px-4 border border-gray-700 hover:gray-500"
              >
                Lista de frequência
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataTableInProgress;
