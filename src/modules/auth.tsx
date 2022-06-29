import React, { useState, useContext, useEffect, createContext } from 'react';
// import { useCookies } from 'react-cookie';

export let TOKEN;

export const AuthContext = createContext({ isLogin: false, username: null, setLogin: (user) => null, setLogout: () => null });

const AuthProvider = ({ children }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  // const [{ isLogin, username }, setState] = useState({ isLogin: !!cookies?.token, username: cookies?.username });
  const [{ isLogin, username }, setState] = useState({ isLogin: false, username: null });

  const setLogin = (user) => {
    if (!!user.token) {
      setState((prevState) => ({ ...prevState, isLogin: true }));
      // setCookie('token', user.token);
    }
  };

  // useEffect(() => {
  //   if (cookies?.token && cookies.token !== TOKEN) {
  //     TOKEN = cookies.token;
  //   }
  // }, [cookies]);

  const setLogout = () => {
    // removeCookie('token');
    localStorage.removeItem('user');
    setState((prevState) => ({ ...prevState, isLogin: false }));
    console.log('here');
    // window.location.href = '/home';
  };

  return <AuthContext.Provider value={{ isLogin, username, setLogin, setLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
