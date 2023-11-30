import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import Header from "../../components/Header";
import "./dashboard.scss";

function Dashboard() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="container">
      <Header />

      <main>
        <div className="content">
          <h1>Página Dashboard</h1>
          <button onClick={logOut}>Sair</button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
