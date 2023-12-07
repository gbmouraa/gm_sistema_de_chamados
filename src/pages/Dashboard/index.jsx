import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ModalLogout from "../../components/ModalLogout";
import { MessagesSquare, Search, Pencil } from "lucide-react";

import "./dashboard.scss";

function Dashboard() {
  const { setShowNav, showModalLogout } = useContext(AuthContext);

  return (
    <div className="container">
      <Header />

      <main onClick={() => setShowNav(false)}>
        <div className="content">
          <Title>
            <MessagesSquare size={30} color="#ccc" />
            Chamados
          </Title>

          <div className="area-btn-add-chamados">
            <button>Teste</button>
          </div>

          <section style={{ padding: "0" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Data de cadastro</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="Cliente">Loja1</td>
                  <td data-label="Assunto">Visita tecnica</td>
                  <td data-label="Status">
                    <span>Progresso</span>
                  </td>
                  <td data-label="Data de cadastro">17/11/2022</td>

                  <td>
                    <span>
                      <Search color="#fff" />
                    </span>
                    <span>
                      <Pencil color="#fff" />
                    </span>
                  </td>
                </tr>

                <tr>
                  <td data-label="Cliente">Loja2</td>
                  <td data-label="Assunto">Financeiro</td>
                  <td data-label="Status">
                    <span>Aberto</span>
                  </td>
                  <td data-label="Data de cadastro">17/11/2022</td>

                  <td>
                    <span>
                      <Search color="#fff" />
                    </span>
                    <span>
                      <Pencil color="#fff" />
                    </span>
                  </td>
                </tr>

                <tr>
                  <td data-label="Cliente">Loja3</td>
                  <td data-label="Assunto">Suporte</td>
                  <td data-label="Status">
                    <span>Concluido</span>
                  </td>
                  <td data-label="Data de cadastro">17/11/2022</td>

                  <td>
                    <span className="search">
                      <Search color="#fff" />
                    </span>
                    <span className="edit">
                      <Pencil color="#fff" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {showModalLogout && <ModalLogout />}
    </div>
  );
}

export default Dashboard;
