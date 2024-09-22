import { Box, Paper, Typography, LinearProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "../../../../img/uece-logocompleta.png";

const CardDashBoard = () => {
  const totalHours = {
    completed: 190,
    target: 202,
    progress: 80,
  };

  const cards = [
    {
      title: "Acadêmica / Ensino",
      description: "Cursos de língua estrangeira – mínimo três semestres",
      maxHours: 60,
      currentHours: 48,
      progress: 80,
      image: Image,
    },
    {
      title: "Acadêmica / Pesquisa e Produção Científica",
      description: "Apresentação de trabalhos na Semana Universitária – painel",
      maxHours: 48,
      currentHours: 48,
      progress: 80,
      image: Image,
    },
  ];

  return (
    <Box className="flex flex-col items-center">
      <Paper
        className="bg-green-100 p-6 rounded-lg shadow-sm mb-6 w-full max-w-6xl"
        sx={{ backgroundColor: "#E6F7E9" }}
      >
        <Box className="flex items-center gap-2">
          <Box className="bg-green-600 p-2 rounded-md h-[2.7rem] w-[2.5rem]">
            <AccessTimeIcon className="text-white" />
          </Box>
          <Typography variant="h6" className="font-bold text-green-900 ml-2">
            Horas totais concluídas
          </Typography>
        </Box>

        <Typography
          sx={{ marginLeft: "3rem", marginBottom: "2rem" }}
          variant="body1"
          className="text-green-700 font-semibold mt-2"
        >
          {totalHours.completed} horas de {totalHours.target} horas.
        </Typography>
        <LinearProgress
          variant="determinate"
          value={totalHours.progress}
          className="mt-2 bg-green-200"
          sx={{
            height: 8,
            borderRadius: "2rem",
            backgroundColor: "#D6EDD9",
            "& .MuiLinearProgress-bar": { backgroundColor: "#22C55E" },
          }}
        />
        <Typography
          variant="body2"
          className="text-right mt-1 text-green-900 font-semibold"
        >
          {totalHours.progress}%
        </Typography>
      </Paper>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-[10rem] w-full max-w-6xl">
        {cards.map((card, index) => (
          <Paper
            key={index}
            className="p-4 shadow-md mb-4"
            sx={{ backgroundColor: "#F0F4F8", height: "auto" }}
          >
            <img
              src={card.image}
              alt="Imagem ilustrativa"
              className="w-full h-32 object-cover mb-4 rounded"
            />
            <Box className="mb-[9rem]">
              <Typography
                variant="h6"
                className="text-center mb-2"
                sx={{ fontWeight: "bold" }}
              >
                {card.title}
              </Typography>
              <Typography variant="body2" className="text-center">
                {card.description}
              </Typography>
            </Box>
            <Box>
              <LinearProgress
                variant="determinate"
                value={card.progress}
                sx={{
                  height: 8,
                  borderRadius: "2rem",
                  backgroundColor: "#D6EDD9",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#22C55E" },
                }}
              />
              <Typography
                variant="body2"
                className="text-right mt-1 text-green-900 font-semibold"
              >
                {card.progress}%
              </Typography>
              <Box className="flex justify-center mt-2 text-sm">
                <Typography className="mr-2">
                  {card.currentHours}h de {card.maxHours}h totais
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CardDashBoard;
