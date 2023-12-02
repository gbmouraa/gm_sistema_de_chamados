import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Settings, Pencil, UserRound } from "lucide-react";
import { AuthContext } from "../../contexts/auth";

import "./profile.scss";

function Profile() {
  const { user } = useContext(AuthContext);

  // efeito visual instataneo
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  // para alterar no banco
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    const img = e.target.files[0];

    if (img.type === "image/jpeg" || img.type === "image/png") {
      setImageAvatar(img);

      setAvatarUrl(URL.createObjectURL(img));
    } else {
      alert("Insira uma imagem do tipo jpeg ou png.");
    }
  }

  return (
    <div className="container">
      <Header />

      <main>
        <div className="content">
          <Title>
            <Settings size={30} color="#ccc" />
            Perfil
          </Title>

          <section>
            <div className="form-profile">
              <div className="avatar-container">
                {avatarUrl === null ? (
                  <UserRound size={180} color="#ccc" />
                ) : (
                  <img src={avatarUrl} alt="Foto de perfil" />
                )}

                <label htmlFor="input-file">
                  <Pencil size={16} color="#fff" />
                  Editar
                </label>
                <input
                  type="file"
                  accept="img/*"
                  id="input-file"
                  onChange={handleFile}
                />
              </div>

              <div className="input-area">
                <label>Nome</label>
                <input type="text" value={user.nome} />
              </div>

              <div className="input-area" style={{ pointerEvents: "none" }}>
                <label>Email</label>
                <input type="text" readOnly value={user.email} />
              </div>

              <button>Salvar</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;
