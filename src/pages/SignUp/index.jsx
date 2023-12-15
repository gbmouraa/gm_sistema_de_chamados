import { useForm } from "react-hook-form";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import validator from "validator";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, loadingAuth } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data) {
    const { nome, email, password } = data;

    await signUp(nome, email, password);
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
              type={showPassword ? "text" : "password"}
              id="password"
              required
              autoComplete="off"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
              })}
            />
            <label htmlFor="password">Senha</label>

            <button
              className="btn-toggle-password"
              onClick={() => setShowPassword(() => !showPassword)}
            >
              {showPassword ? (
                <Eye size={24} color="#ccc" />
              ) : (
                <EyeOff size={24} color="#ccc" />
              )}
            </button>

            {errors?.password?.type === "minLength" && (
              <p className="error-message">
                Senha deve conter no minimo 6 caracteres.
              </p>
            )}

            {errors?.password?.type === "maxLength" && (
              <p className="error-message">
                Senha deve conter no máximo 16 caracteres.
              </p>
            )}

            {errors?.password?.type === "required" && (
              <p className="error-message">Senha não pode estar vazio.</p>
            )}
          </div>

          <div className="actions-area">
            <button
              onClick={() => handleSubmit(onSubmit)()}
              className="default-btn"
            >
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
