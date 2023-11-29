import { useForm } from "react-hook-form";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import validator from "validator";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setLoadingAuth, loadingAuth } = useContext(AuthContext);

  function onSubmit(data) {
    setLoadingAuth(true);
  }

  return (
    <div className="login-area">
      <div className="card">
        <div className="loading-area">
          <span className={loadingAuth ? "loading-animation" : ""}></span>
        </div>
        <img src={logo} alt="Logo Gm solutions" />
        <span style={{ marginBottom: "0" }}>Criar nova conta</span>

        <div className="form">
          <div className="input-container">
            <input
              className={errors?.nome && "input-error"}
              type="text"
              id="name"
              required
              autoComplete="off"
              {...register("nome", { required: true })}
            />
            <label htmlFor="email">Nome</label>

            {errors?.nome?.type === "required" && (
              <p className="error-message">Nome não pode estar vazio.</p>
            )}
          </div>

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
              <p className="error-message">Email não pode estar vazio.</p>
            )}
            {errors?.email?.type === "validate" && (
              <p className="error-message">Insira um email válido.</p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors?.password && "input-error"}
              type="password"
              id="password"
              required
              autoComplete="off"
              {...register("password", { required: true, minLength: 6 })}
            />
            <label htmlFor="password">Senha</label>

            {errors?.password?.type === "minLength" && (
              <p className="error-message">
                Senha deve conter no minimo 6 caracteres.
              </p>
            )}

            {errors?.password?.type === "required" && (
              <p className="error-message">Senha não pode estar vazio.</p>
            )}
          </div>

          <div className="actions-area">
            <button onClick={() => handleSubmit(onSubmit)()} className="login">
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
        </div>
      </div>
    </div>
  );
}

export default SignUp;
