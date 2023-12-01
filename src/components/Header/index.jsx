import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  UsersRound,
  Settings,
  LogOut,
  UserRound,
  X,
  Menu,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./header.scss";
import logo from "../../assets/logo.png";

function Header() {
  const { user, showNav, setShowNav, logOut } = useContext(AuthContext);

  function handleLogOut() {
    logOut();
    setShowNav(false);
  }

  return (
    <>
      <div
        className={`menu-area ${
          showNav ? "menu-area-disabled" : "menu-area-active"
        }`}
      >
        <button
          className="nav-btn menu-btn"
          onClick={() => setShowNav(!showNav)}
        >
          <Menu size={24} color="#ccc" />
        </button>

        <div>
          <img src={logo} alt="Logo" style={{ maxWidth: "100px" }} />
        </div>
      </div>

      <header className={showNav ? "active" : ""}>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <button
            className="nav-btn close-menu-btn"
            onClick={() => setShowNav(!showNav)}
          >
            <X size={24} color="#ccc" />
          </button>
        </div>

        <div className="avatar">
          {user.avatarUrl === null ? (
            <UserRound size={30} color="#ccc" />
          ) : (
            <img src={user.avatarUrl} alt="Foto de perfil do usuário" />
          )}

          <span>Olá {user.nome}</span>
        </div>

        <div className="actions">
          <Link onClick={() => setShowNav(false)}>
            <Home size={24} color="#ccc" />
            Chamados
          </Link>

          <Link onClick={() => setShowNav(false)}>
            <UsersRound size={24} color="#ccc" />
            Clientes
          </Link>

          <Link to="/profile" onClick={() => setShowNav(false)}>
            <Settings size={24} color="#ccc" />
            Configurações
          </Link>

          <Link onClick={handleLogOut}>
            <LogOut size={24} color="#ccc" />
            Sair
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
