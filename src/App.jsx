import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoticeDetails from "./NoticeDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice/:id" element={<NoticeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;