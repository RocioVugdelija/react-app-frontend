import jwt_decode from "jwt-decode";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

//Método para loguear un usuario
export const loginUser = (user, dispatch, seterror) => {

  //Opciones a enviar para obtener el request
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user) //Contiene el email y contraseña
  };

  fetch("http://localhost:3001/api/v0/authenticate", requestOptions)
    .then(res => res.json())
    .then(data => {
      
      //Si el response trae el token, entonces lo guarda en el localstorage y setea el usuario actual
      if (data.jwt) {

        const token = data.jwt;
        localStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        //Nos aseguramos de que si habían errores en pantalla, no los muestre mas
        seterror("");
        dispatch(setCurrentUser(decoded));

      } else {

        //Manejamos un error si los datos no son correctos y no obtenemos ningún token
        seterror("El email y/o contraseñas no son correctos");
        logoutUser(dispatch);

      }
    })
    .catch(err => {
      logoutUser(dispatch);
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};