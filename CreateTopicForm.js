import { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";

function CreateTopicForm({ sectionId, onTopicCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    console.log("Создание темы...");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/sections/${sectionId}/create_topic/`,
        { title, description },
        { headers: { Authorization: `Token ${token}` } }
      );
      console.log("Тема создана:", res.data);
      setTitle("");
      setDescription("");
      if (onTopicCreated) onTopicCreated(res.data);
    } catch (err) {
      console.error("Ошибка при создании темы:", err);
      setError("Не удалось создать тему");
    }
  };

  return (
    <Paper style={{ padding: "20px", marginTop: "20px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", color: "#fff" }}>
      <Typography variant="h5" gutterBottom>Новая тема</Typography>
      <TextField
        fullWidth
        label="Название"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />
      <TextField
        fullWidth
        label="Описание"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Создать тему
      </Button>
    </Paper>
  );
}

export default CreateTopicForm;
