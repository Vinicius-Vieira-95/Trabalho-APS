import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  /*   TablePagination, */
  TableRow,
  Typography,
  /*  TableSortLabel, */
  /* Tooltip,*/
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { mockTabelaEventosAluno } from "../../../mock/mockTabelaEventosAluno";
/* import  {  useEffect, useState } from "react"; */

const DatatableAluno = () => {
  return (
    <Box>
      <Typography
        sx={{ flex: "1 1 100%", fontSize: "2rem", paddingBottom: "5rem" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Eventos em aberto
      </Typography>
      <TableContainer component={Paper} sx={{ paddingTop: "0.7rem" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Evento</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell sx={{textAlign:'center'}}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTabelaEventosAluno.map((evento, index) => (
              <TableRow key={index}>
                <TableCell>{evento.evento}</TableCell>
                <TableCell>{evento.descricao}</TableCell>
                <TableCell>{evento.categoria}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button>Inscrever-se</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default DatatableAluno;
