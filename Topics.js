import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

function Topics({ sectionId }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://127.0.0.1:8000/api/sections/${sectionId}/topics/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setTopics(res.data))
    .catch(err => console.error("Ошибка загрузки тем:", err));
  }, [sectionId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "40px",
        color: "white"
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Темы раздела
      </Typography>

      {topics.map(t => (
        <Card
          key={t.id}
          sx={{
            marginBottom: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
          }}
        >
          <CardContent>
  <Typography variant="h6">
    <Link
      to={`/topics/${t.id}`}
      style={{ color: "#90caf9", textDecoration: "none" }}
    >
      {t.title}
    </Link>
  </Typography>
  <Typography variant="body2">Автор: {t.author__username}</Typography>
  <Typography variant="body2">{t.description}</Typography> {/* 🔹 описание */}
</CardContent>

        </Card>
      ))}
    </div>
  );
}

export default Topics;
