import React from 'react'
import styles from './login.module.css'
import { connect} from 'react-redux'
import {doGoogleLoginAction, logOutAction} from '../../redux/userDuck'

function LoginPage({loggedIn, fetching, doGoogleLoginAction, logOutAction}) {


    function logOut() {
       logOutAction() 
    }
    function doLogin() {
        doGoogleLoginAction()
    }
    if(fetching) return <h1>cargando...</h1>
    return (
        <div className={styles.container}>
            {loggedIn ? <h1>
                    Cierra tu sesion
            </h1>:<h1>
                    Inicio sesion con Google                
            </h1>
            }
           {loggedIn ?<button onClick={logOut}>
                Cerrar Sesión
            </button> :<button onClick={doLogin}>
                Iniciar
            </button>}
            
            
            
        </div>
    )
}

function mapState({user:{fetching, loggedIn}}){
    return{
        fetching,
        loggedIn
    }
}
export default connect(mapState, {doGoogleLoginAction, logOutAction})(LoginPage)