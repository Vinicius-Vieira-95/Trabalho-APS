import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PostConfirmPresence from "../../service/Event/PostConfirmPresence";

const ConfirmPresence: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || ""; // Get token from URL query

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call your API function here with email and token
    try {
      const response = await PostConfirmPresence(token, email);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error sending email and token:", error);
    }
  };

  return (
    <main className="flex-1 h-screen bg-slate-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-4 w-80 flex flex-col gap-4">
        {success ? (
          <>Presença confirmada com sucesso!</>
        ) : (
          <>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Confirmar
            </Button>
          </>
        )}
      </form>
    </main>
  );
};

export default ConfirmPresence;
