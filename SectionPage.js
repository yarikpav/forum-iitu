import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper } from "@mui/material";
import Topics from "./Topics";
import CreateTopicForm from "./CreateTopicForm"; // 🔹 импортируем форму

function SectionPage() {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://127.0.0.1:8000/api/sections/${sectionId}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setSection(res.data))
    .catch(err => console.error("Ошибка загрузки раздела:", err));
  }, [sectionId]);

  if (!section) {
    return <Typography>Загрузка раздела...</Typography>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "40px",
      }}
    >
      <Paper
        style={{
          padding: "20px",
          margin: "0 auto",
          maxWidth: "800px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "12px",
          color: "#fff",
        }}
        elevation={6}
      >
        <Typography variant="h3" gutterBottom>{section.title}</Typography>
        <Typography variant="body1" gutterBottom>{section.description}</Typography>

        {/* Список тем */}
        <Topics sectionId={sectionId} />

        {/* Форма для создания новой темы */}
        <CreateTopicForm
          sectionId={sectionId}
          onTopicCreated={(newTopic) => {
            console.log("Добавлена новая тема:", newTopic);
          }}
        />
      </Paper>
    </div>
  );
}

export default SectionPage;
