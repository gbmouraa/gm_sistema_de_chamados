import { useState, createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebaseConection";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          setStorageUser(data);
          setLoadingAuth(false);
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        setLoadingAuth(false);
        alert(error);
      });
  }

  function setStorageUser(user) {
    localStorage.setItem("@tickets", JSON.stringify(user));
  }

  return (
    <AuthContext.Provider value={{ loadingAuth, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
