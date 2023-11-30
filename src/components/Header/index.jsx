import { Link } from "react-router-dom";
import {
  Home,
  UsersRound,
  Settings,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <div className="avatar">
        {user.avatarUrl === null ? (
          <CircleUserRound size={50} color="#ccc" />
        ) : (
          <img src={user.avatarUrl} alt="Foto de perfil do usuário" />
        )}
      </div>

      <div className="actions">
        <Link>
          <Home size={24} color="#ccc" />
          Chamados
        </Link>

        <Link>
          <UsersRound size={24} color="#ccc" />
          Clientes
        </Link>

        <Link>
          <Settings size={24} color="#ccc" />
          Configurações
        </Link>

        <Link>
          <LogOut size={24} color="#ccc" />
          Sair
        </Link>
      </div>
    </header>
  );
}

export default Header;
