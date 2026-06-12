import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

function Sections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get("http://127.0.0.1:8000/api/sections/", {
    headers: { Authorization: `Token ${token}` } // или Bearer
  })
  .then(res => setSections(res.data))
  .catch(err => console.error("Ошибка загрузки разделов:", err));
}, []);




  return (
    <div style={{
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      minHeight: "100vh",
      padding: "20px",
      color: "white"
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Разделы форума
      </Typography>
      {sections.map(sec => (
        <Card key={sec.id} sx={{
          marginBottom: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "white",
          borderRadius: "10px",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
        }}>
          <CardContent>
            <Typography variant="h6">
              <Link to={`/sections/${sec.id}/topics`} style={{ color: "#90caf9", textDecoration: "none" }}>
                {sec.title}
              </Link>
            </Typography>
            <Typography variant="body2">{sec.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Sections;
