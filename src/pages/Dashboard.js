import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/store/AuthContext";

export default function Dashboard(props) {
    const context = useContext(AuthContext);

    // Con esta constante la interfaz de usuario no parecerá rota antes de que renderice el html
    const [showChild, setShowChild] = useState(false);

    //Aquí guardaremos la información del usuario que llega desde el backend
    const [userProfile, setUserProfile] = useState([])

    //Cada vez que renderizo la página, chequeo si el usuario está autenticado para decidir qué página mostrarle. Si está autenticado, traigo su información mediante el get
    useEffect(() => {

        //Si no está autenticado el usuario, lo llevará al login
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            props.history.push("/login");
        }
        setShowChild(true);

        //obtenemos el token desde el localStorage para realizar el request.
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            fetch("http://localhost:3001/api/v0/users/me", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUserProfile(data)
                })
                
                /*A fines de simplificar, solo muestro un error en consola. No muestro visualmente el error porque en esta página el token no expira. Pero si lo hiciera,
                en el siguiente catch entraría un template de error para el dashboard, lo mismo si suponemos que alguien puede falsificar el token*/
                .catch(err => { 
                    console.log(err);
                });
        }
    }, [context.stateUser.isAuthenticated, props.history]);

    if (!showChild) {
        return null;
    } else {
        return (
            <div class="user-form">
                <div class="user-info">
                    <h1>Your profile</h1>
                    <img class="user-image" src={userProfile.avatar} />
                    <div class="user-name">
                        Nombre Completo: {userProfile.name} {userProfile.surname}
                    </div>
                    <div class="user-email">
                        Email: {userProfile.email}
                    </div>
                    <div class="user-role">
                        Rol: {userProfile.role}
                    </div>
                    <div class="user-age">
                        Edad: {userProfile.age}
                    </div>
                </div>
            </div>
        );
    }
}
