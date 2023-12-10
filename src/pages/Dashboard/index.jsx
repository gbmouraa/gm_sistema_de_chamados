import { AuthContext } from "../../contexts/auth";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { MessagesSquare, Search, Pencil } from "lucide-react";
import { db } from "../../services/firebaseConection";
import {
  collection,
  getDocs,
  orderBy,
  startAfter,
  query,
  limit,
  getDoc,
} from "firebase/firestore";

import { Link } from "react-router-dom";

import "./dashboard.scss";
import { format } from "date-fns";

const listRef = collection(db, "chamados");

function Dashboard() {
  const { setShowNav } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const loadChamados = async () => {
      const q = query(listRef, orderBy("created", "desc"), limit(5));

      const querySnapShot = await getDocs(q);
      await updateState(querySnapShot);
    };

    setChamados([]);
    loadChamados();

    return () => {};
  }, []);

  async function updateState(querySnapShot) {
    if (querySnapShot.size === 0) return;

    const lista = [];

    querySnapShot.forEach((doc) => {
      lista.push({
        createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
        cliente: doc.data().cliente,
        assunto: doc.data().assunto,
        status: doc.data().status,
        complemento: doc.data().complemento,
        id: doc.data().id,
        userId: doc.data().userId,
      });
    });

    setChamados((chamados) => [...chamados, ...lista]);
  }

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
            <Link to="/novochamado">Novo chamado</Link>
          </div>

          <section className="table-section">
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
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span>{item.status}</span>
                      </td>
                      <td data-label="Data de cadastro">
                        {item.createdFormat}
                      </td>

                      <td>
                        <div className="actions-table">
                          <Link className="search">
                            <Search size={20} color="#fff" />
                          </Link>
                          <Link className="edit">
                            <Pencil size={20} color="#fff" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
