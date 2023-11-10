import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  return (
    <div className="login-area">
      <div className="card">
        <img src={logo} alt="Logo Gm solutions" />
        <span style={{ marginBottom: "0" }}>Criar nova conta</span>

        <form>
          <div className="input-container">
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Nome</label>
          </div>

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
            <button type="submit" className="login">
              Cadastrar
            </button>
            <Link
              to="/"
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "3.6rem",
              }}
            >
              Já possui uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
