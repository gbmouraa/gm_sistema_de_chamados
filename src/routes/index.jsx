import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";
import Profile from "../pages/Profile";
import Clientes from "../pages/Clientes";
import NotFound from "../pages/NotFound";
import NovoChamado from "../pages/NovoChamado";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />

      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />

      <Route
        path="/clientes"
        element={
          <Private>
            <Clientes />
          </Private>
        }
      />

      <Route path="/novochamado/:id" />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesApp;
