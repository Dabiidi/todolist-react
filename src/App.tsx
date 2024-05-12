import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/login";
import Register from "./pages/register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

