import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const mockTabelaEventosAluno = [
    {
      evento: "Prova de Matemática",
      descricao: "Prova sobre álgebra e geometria.",
      categoria: "Avaliação"
    },
    {
      evento: "Seminário de Ciências",
      descricao: "Apresentação sobre biologia molecular.",
      categoria: "Seminário"
    },
    {
      evento: "Feira de Tecnologia",
      descricao: "Exposição de projetos de tecnologia.",
      categoria: "Feira"
    },
  ];
  


function DataTable() {
    return (
        <Box>
            <TableContainer component={Paper} sx={{ paddingTop: "0.7rem" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Evento</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Categoria</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockTabelaEventosAluno.map((evento, index) => (
                            <TableRow key={index}>
                                <TableCell>{evento.evento}</TableCell>
                                <TableCell>{evento.descricao}</TableCell>
                                <TableCell>{evento.categoria}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default DataTable;