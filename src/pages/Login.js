import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../context/store/AuthContext";
import { loginUser } from "../context/actions/auth.action";
import Error from "../components/Error";
import FormButton from "./FormButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Login(props) {

    const context = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");

    // Con esta constante la interfaz de usuario no parecerá rota antes de que renderice el html
    const [showChild, setShowChild] = useState(false);

    //La siguiente constante marcará si mostramos o no la sección de password, y si deshabilitamos la de email
    const [passwordSection, setPasswordSection] = useState(false);

    //Cada vez que renderizo la página, chequeo si el usuario está autenticado para decidir qué página mostrarle
    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.history.push("/");
        }
        setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);

    //Método que corre cuando el usuario clickea iniciar sesión, con su correspondiente manejo de errores. Loguea al usuario.
    const handleSubmit = e => {
        const user = {
            email,
            password
        };
        if (email === "" || password === "") {
            seterror("Por favor complete todos los datos");
        } else {
            seterror("");
            loginUser(user, context.dispatch, seterror);
        }

        e.preventDefault();
    };

    //Método que corre cuando el usuario clickea en Siguiente, con las validaciones,y su correspondiente manejo de errores
    const handleVerify = e => {

        //Chequeamos que el email termine en drixit.com, sumado a las validaciones frecuentes para emails
        if (!(/^\w+([-]?\w+)*@(?:|drixit)\.(?:|com)+$/.test(email))) {
            seterror("Ingrese un email válido");
        } else {
            seterror("");
            setPasswordSection(true);
        }

        e.preventDefault();
    };


    if (!showChild) {
        return null;
    } else {
        return (

            <div className="user-form">

                <div className="form-container dark-shadow">
                    <h1>Iniciar Sesión</h1>

                    <form >
                        <div className="form-field email-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={passwordSection}
                            />

                            {passwordSection === true ? (
                                <FontAwesomeIcon icon={faCheck} />
                            ) : null}

                        </div>

                        {passwordSection === true ? (

                            <div className="form-field pwd">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                        ) : (null)}

                        <FormButton nextFunction={handleVerify} submitFunction={handleSubmit} passwordSection={passwordSection}></FormButton>
                        {error ? <Error mensaje={error} /> : null}

                    </form>
                </div>
            </div>
        );
    }
}
