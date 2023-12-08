import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { BadgePlus } from "lucide-react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

import "./novoChamado.scss";

const listRef = collection(db, "clientes");

function NovoChamado() {
  const { setShowNav, user } = useContext(AuthContext);
  const [loadingChamado, setLoadingChamado] = useState(false);

  const { id } = useParams();

  const [clientes, setClientes] = useState([]);
  const [clienteSelected, setClienteSelected] = useState(0);
  const [status, setStatus] = useState("Aberto");
  const [assunto, setAssunto] = useState("Suporte");
  const [complemento, setComplemento] = useState("");

  useEffect(() => {
    const loadClientes = async () => {
      const querySnapShot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({ id: doc.id, nomeEmpresa: doc.data().nomeEmpresa });
          });

          setClientes(lista);

          if (snapshot.docs.size === 0) {
            console.log("Nenhum cliente encontrado");
            setClientes({ id: 1, nomeEmpresa: "Nome fantasia" });
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Desculpe, não foi possível carregar clientes.");
          setClientes({ id: 1, nomeEmpresa: "Nome fantasia" });
        });
    };

    loadClientes();
  }, [id]);

  async function handleRegister(e) {
    e.preventDefault();

    setLoadingChamado(true);

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: clientes[clienteSelected].nomeEmpresa,
      assunto: assunto,
      status: status,
      complemento: complemento,
      id: clientes[clienteSelected].id,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado adicionado com sucesso.");
        setClienteSelected(0);
        setAssunto("");
        setStatus("Aberto");
        setComplemento("");
        setLoadingChamado(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Desculpe, ocorreu um erro, tente novamente mais tarde.");
        setLoadingChamado(false);
      });
  }

  function handleChangeClientes(e) {
    setClienteSelected(e.target.value);
  }

  function handleChangeAssunto(e) {
    setAssunto(e.target.value);
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
  }

  return (
    <div className="container">
      <Header />

      <main onClick={() => setShowNav(false)}>
        <div className="content">
          <Title>
            <BadgePlus size={30} color="#ccc" />
            Novo chamado
          </Title>

          <section>
            <form className="form-profile" onSubmit={handleRegister}>
              <div className="input-area">
                <label>Clientes</label>

                <select value={clienteSelected} onChange={handleChangeClientes}>
                  {clientes.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.nomeEmpresa}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="input-area">
                <label>Assunto</label>

                <select value={assunto} onChange={handleChangeAssunto}>
                  <option value="Suporte">Suporte</option>
                  <option value="Visita técnica">Visita técnica</option>
                  <option value="Financeiro">Financeiro</option>
                </select>
              </div>

              <div className="input-area">
                <label>Status</label>

                <div className="radio-area">
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="Aberto"
                      id="aberto"
                      checked={status === "Aberto"}
                      onChange={handleChangeStatus}
                    />
                    <label
                      htmlFor="aberto"
                      style={{ marginBottom: "0", fontSize: "16px" }}
                    >
                      Aberto
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="Progresso"
                      id="progresso"
                      checked={status === "Progresso"}
                      onChange={handleChangeStatus}
                    />
                    <label
                      htmlFor="progresso"
                      style={{ marginBottom: "0", fontSize: "16px" }}
                    >
                      Progresso
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="Atendido"
                      id="atendido"
                      checked={status === "Atendido"}
                      onChange={handleChangeStatus}
                    />
                    <label
                      htmlFor="atendido"
                      style={{ marginBottom: "0", fontSize: "16px" }}
                    >
                      Atendido
                    </label>
                  </div>
                </div>
              </div>

              <div className="input-area">
                <label>Complemento</label>

                <textarea
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>

              <div className="btn-area">
                <button
                  type="submit"
                  style={loadingChamado ? { opacity: "0.7" } : {}}
                >
                  Salvar
                </button>
                {loadingChamado && <Loader />}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NovoChamado;
