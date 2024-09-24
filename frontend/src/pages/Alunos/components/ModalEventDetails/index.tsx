import { Box, Button, Modal } from "@mui/material";
import { FC } from "react";

interface ModalEventsDetailsProps {
  open: boolean;
  handleClose: () => void;
  data?: {
    date: string;
    duration: string;
    description: string;
    present: string;
  };
}

export const ModalEventDetails: FC<ModalEventsDetailsProps> = ({
  handleClose,
  open,
  data,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 5,
          paddingTop: 4,
          paddingBottom: 4,
          paddingRight: 16,
          paddingLeft: 16,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: 32,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Detalhes do Evento
          </p>
          <div
            style={{ height: 3, width: "50%", backgroundColor: "#34C759" }}
          />

          <div>
            <p style={{ color: "#637381" }}>{data?.description}</p>
          </div>

          <div>
            <p style={{ fontWeight: "bold", color: "#637381" }}>
              Data de realização:{" "}
              <span style={{ fontWeight: "normal" }}>{data?.date}</span>
            </p>
            <p style={{ fontWeight: "bold", color: "#637381" }}>
              Duração:{" "}
              <span style={{ fontWeight: "normal" }}>{data?.duration}</span>
            </p>
            {/* <p style={{ fontWeight: "bold", color: "#637381" }}>
              Horas contabilizadas:{" "}
              <span style={{ fontWeight: "normal" }}>{data?.hoursCounted}</span>
            </p> */}
            <p style={{ fontWeight: "bold", color: "#637381" }}>
              Esteve presente:{" "}
              <span style={{ fontWeight: "normal" }}>{data?.present}</span>
            </p>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Button
            variant="contained"
            style={{
              background: "#34C759",
              width: "100%",
              textTransform: "initial",
              height: 50,
            }}
            onClick={handleClose}
          >
            <p style={{ fontSize: 15 }}>Fechar</p>
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
