// import { useContext, useDebugValue } from "react";
// import AuthContext from "../context/AuthProvider";

import { useContext } from 'react';
// contexts
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('Auth context must be use inside AuthProvider');

    return context;


    // -----zapx original code-----
    // const { auth } = useContext(AuthContext);
    // useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    // return useContext(AuthContext);
}


export default useAuth;