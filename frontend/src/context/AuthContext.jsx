// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       fetchUser();
//     }
//   }, [token]);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/user");
//       setUser(res.data);
//     } catch (error) {
//       logout();
//     }
//   };

//   const login = async (email, password) => {
//     const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//     setToken(res.data.token);
//     localStorage.setItem("token", res.data.token);
//     setUser(res.data.user);
//   };

//   const register = async (name, email, password) => {
//     await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

