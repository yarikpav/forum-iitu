import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent, TextField, Button } from "@mui/material";

function TopicPage() {
  const { topicId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://127.0.0.1:8000/api/topics/${topicId}/posts/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setPosts(res.data))
    .catch(err => console.error("Ошибка загрузки сообщений:", err));
  }, [topicId]);

  const handleCreatePost = () => {
    const token = localStorage.getItem("token");
    axios.post(`http://127.0.0.1:8000/api/topics/${topicId}/create_post/`, 
      { content: newPost },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then(res => {
      setPosts([...posts, res.data]);
      setNewPost("");
    })
    .catch(err => console.error("Ошибка создания сообщения:", err));
  };

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
        Сообщения темы
      </Typography>

      {posts.map(p => (
        <Card
          key={p.id}
          sx={{
            marginBottom: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {p.author__username}
            </Typography>
            <Typography variant="body1">{p.content}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Форма для нового сообщения */}
      <Card
        sx={{
          marginTop: 3,
          padding: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "white",
          borderRadius: "10px"
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Напишите сообщение..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          sx={{
            input: { color: "white" },
            textarea: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" }
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            background: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { background: "rgba(255,255,255,0.3)" }
          }}
          onClick={handleCreatePost}
        >
          Отправить
        </Button>
      </Card>
    </div>
  );
}

export default TopicPage;
