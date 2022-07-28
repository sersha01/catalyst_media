import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

import { PrivateRoute, Protect } from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Protect><Login /></Protect>} />
            <Route path="/register" element={<Protect><Register /></Protect>} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
