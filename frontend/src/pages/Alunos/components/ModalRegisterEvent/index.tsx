import { Box, Button, Modal } from "@mui/material";
import { FC } from "react";

interface ModalEventsDetailsProps {
  open: boolean;
  handleClose: () => void;
  data?: {
    id: string;
    date: string;
    duration: string;
    description: string;
  };
  handleRegisterUnregisterUser: (eventId: string) => Promise<void>;
}

export const ModalRegisterEvent: FC<ModalEventsDetailsProps> = ({
  handleClose,
  open,
  data,
  handleRegisterUnregisterUser,
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
            Realizar inscrição no evento
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
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            gap: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
              width: "100%",
              textTransform: "initial",
              borderColor: "#DFE4EA",
              color: "#111928",
              borderWidth: 1,
            }}
          >
            <p style={{ fontSize: 15 }}>Fechar</p>
          </Button>
          <Button
            onClick={() => {
              handleRegisterUnregisterUser.bind(null, data!.id)();
            }}
            variant="contained"
            style={{
              background: "#34C759",
              width: "100%",
              textTransform: "initial",
            }}
          >
            <p style={{ fontSize: 15 }}>Confirmar</p>
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
