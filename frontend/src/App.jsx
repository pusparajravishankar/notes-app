import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router";
import Homepage from "./page/Homepage";
import { Toaster } from "react-hot-toast";
import Updatenote from "./page/Updatenote";




function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/note/:id" element={<Updatenote />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
