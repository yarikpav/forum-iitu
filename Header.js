import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/"); // редирект на главную
  };

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          IITU Forum
        </Typography>

        {token && username ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="body1" sx={{ color: "white" }}>
              {username}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{ color: "white", borderColor: "white" }}
            >
              Выйти
            </Button>
          </div>
        ) : (
          <>
            <Button color="inherit" href="/login">Войти</Button>
            <Button color="inherit" href="/register">Регистрация</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
