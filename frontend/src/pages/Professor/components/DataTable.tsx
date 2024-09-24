import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { CustomButton } from "./custom_style/style";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import findEventsByUserId from "../../../service/Event/findEventsByUserId";
import { Event } from "../../../service/Event/type";
import { useNavigate } from "react-router-dom";
import deleteEvent from "../../../service/Event/deleteEvent";

function DataTable() {
  const navigate = useNavigate();

  const auth = useAuth();

  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async () => {
    const data = await findEventsByUserId(auth!.user!.id!);

    setEvents(data);
  }, [auth]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const redirectToUpdatePage = (id: string) => {
    navigate(`/${id}/editar-evento`);
  };

  const cancelEvent = async (id: string) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  return (
    <Box>
      <Typography
        sx={{
          flex: "1 1 100%",
          fontSize: "2rem",
          paddingBottom: "5rem",
          fontWeight: "bold",
          marginTop: "2rem",
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Eventos em aberto
      </Typography>
      <TableContainer component={Paper} sx={{ paddingTop: "0.7rem" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ alignItems: "center" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Evento</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Categoria
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((evento, index) => (
              <TableRow key={index}>
                <TableCell>{evento.name}</TableCell>
                <TableCell>{evento.description}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Chip
                    label={evento.status}
                    sx={{ backgroundColor: "#DAF8E6", color: "#1A8245" }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <CustomButton
                    onClick={() => {
                      redirectToUpdatePage.bind(null, evento.id)();
                    }}
                    sx={{
                      border: "2px solid #007AFF",
                      color: "#007AFF",
                      marginRight: "1rem",
                    }}
                  >
                    Editar
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      cancelEvent.bind(null, evento.id)();
                    }}
                    sx={{ border: "2px solid #FF3B30", color: "#FF3B30" }}
                  >
                    Cancelar
                  </CustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
