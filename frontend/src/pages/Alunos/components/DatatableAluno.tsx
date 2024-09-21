import { useState } from "react";
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
import { mockTabelaEventosAluno } from "../../../mock/mockTabelaEventosAluno";

interface Evento {
  evento: string;
  descricao: string;
  categoria: string;
}

type Order = "asc" | "desc";

const DatatableAluno = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Evento>("evento");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof Evento) => {
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

  const sortedEventos = mockTabelaEventosAluno.sort((a, b) => {
    if (orderBy === "evento") {
      return order === "asc"
        ? a.evento.localeCompare(b.evento)
        : b.evento.localeCompare(a.evento);
    } else if (orderBy === "descricao") {
      return order === "asc"
        ? a.descricao.localeCompare(b.descricao)
        : b.descricao.localeCompare(a.descricao);
    } else {
      return order === "asc"
        ? a.categoria.localeCompare(b.categoria)
        : b.categoria.localeCompare(a.categoria);
    }
  });
  

  const paginatedEventos = sortedEventos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography
        sx={{ flex: "1 1 100%", fontSize: "2rem", paddingBottom: "5rem" , fontWeight:"bold"}}
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
            <TableRow
              sx={{
                backgroundColor: "#F9FAFB", 
              }}
            >
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === "evento"}
                  direction={orderBy === "evento" ? order : "asc"}
                  onClick={() => handleRequestSort("evento")}
                >
                  Evento
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === "descricao"}
                  direction={orderBy === "descricao" ? order : "asc"}
                  onClick={() => handleRequestSort("descricao")}
                >
                  Descrição
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{textAlign:'center', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === "categoria"}
                  direction={orderBy === "categoria" ? order : "asc"}
                  onClick={() => handleRequestSort("categoria")}
                >
                  Categoria
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight:'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              backgroundColor: "white",
              "& > tr:first-of-type > *": { borderTop: "unset" },
            }}
          >
            {paginatedEventos.map((evento, index) => (
              <TableRow key={index}>
                <TableCell>{evento.evento}</TableCell>
                <TableCell>{evento.descricao}</TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  <Chip
                    label={evento.categoria}
                    sx={{ backgroundColor: "#DAF8E6", color: "#1A8245"}}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#22C55E",
                      color: "#22C55E",
                      borderRadius:'2rem',
                      "&:hover": {
                        backgroundColor: "#22C55E",
                        color: "white",
                      },
                    }}
                  >
                    Inscrever-se
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ display: "flex", justifyContent: "flex-end" }}
          count={mockTabelaEventosAluno.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="Linhas por página"
        />
      </TableContainer>
    </Box>
  );
};

export default DatatableAluno;
