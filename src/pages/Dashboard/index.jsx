import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";

function Dashboard() {
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Página Dashboard</h1>
      <button onClick={logOut}>Sair</button>
    </div>
  );
}

export default Dashboard;
