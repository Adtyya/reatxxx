import { createContext, useState } from "react";

export const LoginContext = createContext({
  login: {},
  setLogin: () => {},
});

export default function AppLayout({ children }) {
  const [login, setLogin] = useState({});
  const value = { login, setLogin };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
