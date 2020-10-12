import React, { Fragment} from "react";
/*Utilizo un fragment para tener más organizada la lógica por la que muestra el botón de Siguiente o el de Iniciar Sesión. Por esta razón los métodos los seguimos teniendo en el
login, para guardar en el fragment solo el html a fines de que sea más fácil de visualizar el template del login*/
const FormButton = props => {
  let { nextFunction , submitFunction, passwordSection } = props;

  return (
    <Fragment>
        {passwordSection?
                  (<div className="form-field">
                      <input type="submit" className="btn primary-btn btn-block" value="Iniciar Sesión" onClick={submitFunction} />
                  </div>)
         : 
                  (<div className="form-field">
                      <input type="submit" className="btn primary-btn btn-block" value="Siguiente" onClick={nextFunction}/>
                  </div>)       
      }
        </Fragment>
  )};
export default FormButton;