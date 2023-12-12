import { Link } from "react-router-dom";
import "./emptyClientes.scss";
import illustration from "../../assets/no-user-found.png";

function EmptyClientes() {
  return (
    <div className="empty-clientes">
      <figure>
        <img src={illustration} alt="illustration" />
      </figure>
      <h1>Não há clientes para abrir um chamado.</h1>
      <p>
        Adicione um novo cliente na aba <Link to="/clientes">clientes</Link>.
      </p>
    </div>
  );
}

export default EmptyClientes;
