import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import WriteupDetail from "./pages/WriteupDetail";
import Writeups from "./pages/Writeups";

function App() {
  return (
    <Router basename="/portfolio">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/writeup/:ctf/:challenge" element={<WriteupDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>

        <footer className="footer">
          <p>
            © 2024 Mohamed Radhouen Boufath (Angel911) • Built with React &
            TypeScript
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
