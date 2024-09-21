import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
    Paper,
    TablePagination,
    Chip,
} from "@mui/material";
import {CustomButton} from './custom_style/style';
import { useState } from "react";

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

type Order = "asc" | "desc";

interface Evento {
    evento: string;
    descricao: string;
    categoria: string;
}

function DataTable() {

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

                        <TableRow sx={{ alignItems: 'center' }}>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === "evento"}
                                    direction={orderBy === "evento" ? order : "asc"}
                                    onClick={() => handleRequestSort("evento")}
                                >
                                    Evento
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === "descricao"}
                                    direction={orderBy === "descricao" ? order : "asc"}
                                    onClick={() => handleRequestSort("descricao")}
                                >
                                    Descrição
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === "categoria"}
                                    direction={orderBy === "categoria" ? order : "asc"}
                                    onClick={() => handleRequestSort("categoria")}
                                >
                                    Categoria
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockTabelaEventosAluno.map((evento, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'center' }}>{evento.evento}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{evento.descricao}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Chip
                                        label={evento.categoria}
                                        sx={{ backgroundColor: "#DAF8E6", color: "#1A8245" }}
                                    />
                                </TableCell>
                                <TableCell  sx={{ textAlign: 'center' }}>
                                    <CustomButton sx={{ border: '2px solid #007AFF', color: '#007AFF' }}>
                                        Editar
                                    </CustomButton>
                                    <CustomButton sx={{ border: '2px solid #FF3B30', color: '#FF3B30' }}>
                                        Cancelar
                                    </CustomButton>
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
}

export default DataTable;