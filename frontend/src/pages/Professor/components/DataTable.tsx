import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

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

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        width: '8rem',
        height: '2rem',
    };

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

                        <TableRow sx={{alignItems: 'center'}}>
                            <TableCell sx={{textAlign:'center'}}>Evento</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Descrição</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Categoria</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockTabelaEventosAluno.map((evento, index) => (
                            <TableRow key={index}>
                                <TableCell>{evento.evento}</TableCell>
                                <TableCell>{evento.descricao}</TableCell>
                                <Box sx={{
                                    ...commonStyles, borderRadius: '30px',
                                    backgroundColor: '#DAF8E6',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                    <TableCell sx={{ color: '#1A8245', textAlign: 'center' }}>{evento.categoria}</TableCell>
                                </Box>
                                <TableCell>
                                    <Button>
                                        Editar
                                    </Button>
                                    <Button>
                                        Cancelar
                                    </Button>
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