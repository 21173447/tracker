import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Form from "./components/Form";
import ViewIssues from "./components/ViewIssues";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Form />} />             {/* Home / Create Issue */}
          <Route path="/create" element={<Form />} />      {/* Create Issue */}
          <Route path="/issues" element={<ViewIssues />} /> {/* View Issues */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
