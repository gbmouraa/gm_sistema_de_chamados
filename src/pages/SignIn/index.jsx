import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import "./signIn.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  return (
    <div className="login-area">
      <div className="card">
        <img src={logo} alt="Logo Gm solutions" />

        <span>Login</span>
        <p>Use sua conta Gm Solutions</p>

        <form>
          <div className="input-container">
            <input
              type="text"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
          </div>

          <div className="actions-area">
            <Link to="/register">Criar uma conta</Link>
            <button type="submit" className="login">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
