import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { BadgePlus } from "lucide-react";

function NovoChamado() {
  const { setShowNav } = useContext(AuthContext);

  const { id } = useParams();

  return (
    <div className="container">
      <Header />

      <main onClick={() => setShowNav(false)}>
        <div className="content">
          <Title>
            <BadgePlus size={30} color="#ccc" />
            Novo chamado
          </Title>

          <section></section>
        </div>
      </main>
    </div>
  );
}

export default NovoChamado;
