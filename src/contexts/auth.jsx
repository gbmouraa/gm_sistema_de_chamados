import { useState, createContext } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [loadingAuth, setLoadingAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ loadingAuth, setLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
