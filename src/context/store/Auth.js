import React, { useReducer, useEffect,useState } from "react";
import authReducer from "../reducers/auth.reducer";
import { setCurrentUser } from "../actions/auth.action";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";


//Usamos context para poder compartir la información tanto en el login como en el dashboard sin tener que ir pasando props. 
//En esta app quizás no hace tanta diferencia por ser pequeña, pero si tuviera algunas pages más ya se vuelve útil. 
//En una aplicación mucho más grande sería más aconsejable usar Redux

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (localStorage.jwt) {
            const decoded = localStorage.jwt ? localStorage.jwt : "";
            dispatch(setCurrentUser(jwt_decode(decoded))); 
        }
        setShowChild(true);
    }, []); 

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthContext.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthContext.Provider>
        );
    }
};

export default Auth;
