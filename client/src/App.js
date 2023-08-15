import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import AuthContextProvider from "./context/AuthContext";
import About from "./views/About";
// import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Auth authRoute="login" />} />
          <Route
            exact
            path="/register"
            element={<Auth authRoute="register" />}
          />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
