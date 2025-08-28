import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Form from "./components/Form";
import IssuesPage from "../src/pages/IssuesPage";
import HomePage from "../src/pages/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Content area grows to fill space */}
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<Form />} />
            <Route path="/issues" element={<IssuesPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
