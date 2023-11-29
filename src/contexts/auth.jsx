import { useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebaseConection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

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

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        setStorageUser(data);
        setLoadingAuth(false);
        navigate("/dashboard");
        setLoadingAuth(false);
      })
      .catch((error) => console.log(error));
  }

  function setStorageUser(user) {
    localStorage.setItem("@tickets", JSON.stringify(user));
  }

  async function logOut() {
    await signOut(auth);
    localStorage.removeItem("@tickets");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ loadingAuth, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };