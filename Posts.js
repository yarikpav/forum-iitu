import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

function Posts() {
  const { topicId } = useParams();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/topics/${topicId}/posts/`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, [topicId]);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://127.0.0.1:8000/api/topics/${topicId}/posts/`,
        { content },
        { headers: { Authorization: `Token ${token}` } }
      );
      setContent("");
      // обновляем список
      const res = await axios.get(`http://127.0.0.1:8000/api/topics/${topicId}/posts/`);
      setPosts(res.data);
    } catch (err) {
      alert("Ошибка отправки: " + err.message);
    }
  };

  return (
    <div>
      <Typography variant="h5">Сообщения</Typography>
      {posts.map(p => (
        <div key={p.id}>
          <b>{p.author__username}</b>: {p.content}
        </div>
      ))}
      <TextField
        fullWidth
        label="Ваше сообщение"
        value={content}
        onChange={e => setContent(e.target.value)}
        sx={{ marginTop: 2 }}
      />
      <Button variant="contained" sx={{ marginTop: 1 }} onClick={handleSend}>
        Отправить
      </Button>
    </div>
  );
}

export default Posts;
