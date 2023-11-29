import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import validator from "validator";
import { AuthContext } from "../../contexts/auth";

import "./signIn.scss";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loadingAuth, signIn } = useContext(AuthContext);

  async function onSubmit(data) {
    const { email, password } = data;
    await signIn(email, password);
  }

  return (
    <div className="login-area">
      <div className="card">
        <div className="loading-area">
          <span className={loadingAuth ? "loading-animation" : ""}></span>
        </div>
        <img src={logo} alt="Logo Gm solutions" />

        <span>Login</span>
        <p>Use sua conta Gm Solutions</p>

        <div className="form">
          <div className="input-container">
            <input
              className={errors?.email && "input-error"}
              type="text"
              id="email"
              required
              autoComplete="off"
              {...register("email", {
                required: true,
                validate: (value) => validator.isEmail(value),
              })}
            />
            <label htmlFor="email">Email</label>

            {errors?.email?.type === "required" && (
              <p className="error-message">Email não pode estar vazio</p>
            )}
            {errors?.email?.type === "validate" && (
              <p className="error-message">insira um email válido</p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors?.password && "input-error"}
              type="password"
              id="password"
              required
              autoComplete="off"
              {...register("password", { required: true })}
            />
            <label htmlFor="password">Senha</label>

            {errors?.password?.type === "required" && (
              <p className="error-message">Senha não pode estar vazio</p>
            )}
          </div>

          <div className="actions-area">
            <Link to="/register">Criar uma conta</Link>
            <button onClick={() => handleSubmit(onSubmit)()} className="login">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
