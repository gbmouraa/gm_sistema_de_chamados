import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Settings, Pencil, UserRound } from "lucide-react";
import { AuthContext } from "../../contexts/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { toast } from "react-toastify";

import "./profile.scss";

function Profile() {
  const { user, setUser, setStorageUser } = useContext(AuthContext);

  // efeito visual instataneo
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  // para alterar no banco
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    const img = e.target.files[0];

    if (img.type === "image/jpeg" || img.type === "image/png") {
      setImageAvatar(img);

      setAvatarUrl(URL.createObjectURL(img));
    } else {
      alert("Insira uma imagem do tipo jpeg ou png.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      let uid = user.uid;

      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        nome: nome,
      })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          };

          setUser(data);
          setStorageUser(data);
          toast.success("Dados alterados com sucesso!");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, ocorreu um erro, tente novamente mais tarde.");
        });
    }
    // implementar handleUpload
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
            <form className="form-profile" onSubmit={handleSubmit}>
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
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="input-area" style={{ pointerEvents: "none" }}>
                <label>Email</label>
                <input type="text" readOnly value={email} />
              </div>

              <button>Salvar</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;
