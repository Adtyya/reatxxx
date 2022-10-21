import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./App";
import Dashboard from "./dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
