import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  TablePagination,
  Chip,
  Paper,
} from "@mui/material";
import GetEventList from "../../../service/Event/GetEventList";
import { Event } from "../../../service/Event/type";
import { ModalUnregisterEvent } from "./ModalUnregisterEvent";
import { ModalRegisterEvent } from "./ModalRegisterEvent";
import { useAuth } from "../../../hook/useAuth";
import { format } from "date-fns";
import { registerUnregisterEvent } from "../../../service/Event/register-unregister-event";

type Order = "asc" | "desc";

const DatatableAluno = () => {
  const auth = useAuth();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Event>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [eventos, setEventos] = useState<Event[]>([]);

  const [modalData, setModalData] = useState<{
    id: string;
    date: string;
    description: string;
    duration: string;
  }>();

  const [modalRegisterEventOpen, setModalRegisterEventOpen] =
    useState<boolean>(false);
  const [modalUnregisterEventOpen, setModalUnregisterEventOpen] =
    useState<boolean>(false);

  const handleOpenModalRegisterEvent = (event: Event) => {
    setModalData({
      id: event.id,
      duration: event.startDate + " - " + event.endDate,
      description: event.description,
      date: format(event.date, "dd/MM/yyyy"),
    });
    setModalRegisterEventOpen(true);
  };

  const handleOpenModalUnregisterEvent = (event: Event) => {
    setModalData({
      id: event.id,
      duration: event.startDate + " - " + event.endDate,
      description: event.description,
      date: format(event.date, "dd/MM/yyyy"),
    });
    setModalUnregisterEventOpen(true);
  };

  const handleCloseModalRegisterEvent = () => setModalRegisterEventOpen(false);
  const handleCloseModalUnregisterEvent = () =>
    setModalUnregisterEventOpen(false);

  const handleRegisterUnregisterUser = async (eventId: string) => {
    await registerUnregisterEvent(eventId, auth?.user?.id || "mocked-id");
    await fetchEventos();
    if (modalRegisterEventOpen) handleCloseModalRegisterEvent();
    if (modalUnregisterEventOpen) handleCloseModalUnregisterEvent();
  };

  const fetchEventos = async (): Promise<void> => {
    try {
      const data = await GetEventList();
      console.log("Dados retornados:", data);
      if (Array.isArray(data)) {
        setEventos(data);
      } else {
        console.error("Dados retornados não são um array", data);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  useEffect(() => {
    const fetchEventos = async (): Promise<void> => {
      try {
        const data = await GetEventList();
        console.log("Dados retornados:", data);
        if (Array.isArray(data)) {
          setEventos(data);
        } else {
          console.error("Dados retornados não são um array", data);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const handleRequestSort = (property: keyof Event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedEvents = [...eventos].sort((a, b) => {
    const sortableFields = ["name", "description", "status"];

    if (sortableFields.includes(orderBy)) {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return order === "asc" ? comparison : -comparison;
      }
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      if (aValue < bValue) return order === "asc" ? -1 : 1;
    }

    return 0;
  });

  const paginatedEventos = sortedEvents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <ModalRegisterEvent
        handleRegisterUnregisterUser={handleRegisterUnregisterUser}
        data={modalData}
        open={modalRegisterEventOpen}
        handleClose={handleCloseModalRegisterEvent}
      />
      <ModalUnregisterEvent
        handleRegisterUnregisterUser={handleRegisterUnregisterUser}
        data={modalData}
        open={modalUnregisterEventOpen}
        handleClose={handleCloseModalUnregisterEvent}
      />

      <Box>
        <Typography
          sx={{
            flex: "1 1 100%",
            fontSize: "2rem",
            paddingBottom: "5rem",
            fontWeight: "bold",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Eventos em aberto
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ paddingTop: "0.7rem", backgroundColor: "#F9FAFB" }}
        >
          <Table aria-label="sortable and paginated table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Nome do Evento
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={orderBy === "description" ? order : "asc"}
                    onClick={() => handleRequestSort("description")}
                  >
                    Descrição
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleRequestSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                backgroundColor: "white",
                "& > tr:first-of-type > *": { borderTop: "unset" },
              }}
            >
              {paginatedEventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell>{evento.name}</TableCell>
                  <TableCell>{evento.description}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={evento.status}
                      sx={{ backgroundColor: "#DAF8E6", color: "#1A8245" }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {evento.usersList.find(
                      (value) => value.userId === auth?.user?.id
                    ) ? (
                      <Button
                        onClick={() => {
                          handleOpenModalUnregisterEvent.bind(null, evento)();
                        }}
                        variant="outlined"
                        sx={{
                          borderColor: "#FF3B30",
                          color: "#FF3B30",
                          borderRadius: "2rem",
                          "&:hover": {
                            backgroundColor: "#FF3B30",
                            color: "white",
                          },
                        }}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleOpenModalRegisterEvent.bind(null, evento)();
                        }}
                        variant="outlined"
                        sx={{
                          borderColor: "#22C55E",
                          color: "#22C55E",
                          borderRadius: "2rem",
                          "&:hover": {
                            backgroundColor: "#22C55E",
                            color: "white",
                          },
                        }}
                      >
                        Inscrever-se
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            sx={{ display: "flex", justifyContent: "flex-end" }}
            count={eventos.length}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Linhas por página"
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default DatatableAluno;
