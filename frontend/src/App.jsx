import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Form from "./components/Form";
import IssuesPage from "../src/pages/IssuesPage";
import HomePage from "../src/pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<Form />} />
          <Route path="/issues" element={<IssuesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
