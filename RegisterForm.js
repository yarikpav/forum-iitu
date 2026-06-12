import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      navigate("/");
    } catch (err) {
      alert("Ошибка регистрации: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "30px",
          width: "400px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Регистрация
        </Typography>
        <TextField
          fullWidth
          label="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginTop: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        <TextField
          fullWidth
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 3, background: "linear-gradient(90deg, #1CB5E0, #000851)" }}
          onClick={handleRegister}
        >
          Зарегистрироваться
        </Button>
      </Paper>
    </div>
  );
}

export default RegisterForm;
