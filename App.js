import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sections from "./components/Sections";
import SectionPage from "./components/SectionPage";
import TopicPage from "./components/TopicPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Sections />} />
        <Route path="/sections/:sectionId" element={<SectionPage />} />
        <Route path="/topics/:topicId" element={<TopicPage />} />
        <Route path="/sections/:sectionId/topics" element={<SectionPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
