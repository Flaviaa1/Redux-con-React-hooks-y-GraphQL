import {loginWithGoogle, signOutGoogle} from '../firebase'
import { retreiveFavs } from './charsDuck';
//constant
let initialData ={
    loggedIn: false,
    fetching:false
}
let LOGIN ="LOGIN"
let LOGIN_SUCCES ="LOGIN_SUCCES"
let LOGIN_ERROR ="LOGIN_ERROR"
let LOG_OUT="LOG_OUT"
//reducer

 export default function reducer(state = initialData, action){
     switch(action.type){
         case LOG_OUT:
             return { ...initialData}
         case LOGIN_SUCCES:
             return { ...state, fetching: false, ...action.payload, loggedIn:true}
         case LOGIN_ERROR:
             return { ...state, fetching:false, error: action.payload}
         case LOGIN:
             return { ...state, fetching: true }
             default:
                 return state
     }
 }

 //aux
 function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage)
}
 //actions 
export let logOutAction =() => (dispatch, getState) =>{
    signOutGoogle()
    dispatch({
        type:LOG_OUT
    })
    localStorage.removeItem('storage')
 }

 export let  restoreSessionAction =() => dispatch =>{
     let storage = localStorage.getItem('storage')
     storage = JSON.parse(storage)
     if(storage && storage.user ){
         dispatch({  
             type: LOGIN_SUCCES,
             payload:storage.user
         })
     }
 }

 
//action faction create
export let doGoogleLoginAction =() => (dispatch, getState) =>{
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
    .then(user=>{
        dispatch({
            type: LOGIN_SUCCES,
            payload:{ 
               uid:user.uid,
                displayName: user.displayName,
                email:user.email,
                photoURL:user.photoURL
            }
        })
        saveStorage(getState())
        retreiveFavs(dispatch, getState)
    })
    .catch(err=>{
        console.log(err)
        dispatch({
            type:LOGIN_ERROR,
            payload:err.message
        })
    })

}
