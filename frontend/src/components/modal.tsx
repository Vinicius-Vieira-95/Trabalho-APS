import { Box, Modal as MUIModal } from "@mui/material";
import { FC } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({
  handleClose,
  open,
  title,
  children,
}) => {
  return (
    <MUIModal
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
          paddingRight: 8,
          paddingLeft: 8,
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
              fontSize: 16,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {title}
          </p>
          <div
            style={{ height: 3, width: "50%", backgroundColor: "#34C759" }}
          />

          <div>{children}</div>
        </div>
      </Box>
    </MUIModal>
  );
};
