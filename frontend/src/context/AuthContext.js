import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import * as API from "../axios/axios";

const AuthContext = createContext();
export default AuthContext;

export const BaseUrl = "http://localhost: 8000/";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
  const [balance, setBalance] = useState(0.00);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const signup = async (user) => {
    await API.register(user).then((res) => {
        if (res.data.success) {
            navigate("/login");
        } else {
            setError(res.data.message);
        }
        }).catch((err) => {
            console.log(err);
        })
  }

  const login = async (user) => {
    await API.login(user).then((res) => {
            localStorage.setItem("authTokens", JSON.stringify(res.data));
            setUser(jwt_decode(res.data.refresh));
            navigate("/");
        }).catch((err) => {
            setError("Invalid Credentials");
        })
    }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    }

  const retrieve = async () => {
    await API.retrieve().then((res) => {
            setBalance(res.data.balance);
            setHistory(res.data.transactions);
        }).catch((err) => {
            console.log(err);
            logout();
        })
    }

  const update = async (data) => {
    await API.update(data).then((res) => {
            setBalance(res.data.balance);
            setHistory(res.data.transactions);
        }).catch((err) => {
            console.log(err);
            logout();
        })
    }

  const contextData = {
    user,
    balance,
    history,
    error,

    signup,
    login,
    logout,
    retrieve,
    update,

    setError
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};