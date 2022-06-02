import {types} from "../types";
import {auth, googleProvider} from "../../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import {getDs, getDsOptions, getWhoAmI, token} from "../../api/api-service";

/*const query = gql`
  query {
    getWhoAmi {
      id
      nombreCompleto
      rol {
        id
        nombre
        esEstudiante
        esProfesor
        esAdministrador
      }
      institucion {
        id
        nombre
      }
    }
  }
`;*/

export const startCreateUserWithEmailAndPassword2 = ({correoElectronico, contraseña, userSaved}) => {
  const {nombre, apellido} = userSaved;
  return async (dispatch) => {
    console.log(userSaved)
    const {user} = await createUserWithEmailAndPassword(auth, correoElectronico, contraseña);
    await updateProfile(user, {displayName: nombre + " " + apellido});
    const ds = getDs('usuario');
    await ds.update(userSaved.id, {uid: user.uid,})
    await dispatch(startLogin(user));
  }
}


export const startCreateUserWithEmailAndPassword = ({correoElectronico, nombre, apellido, fechaNacimiento, identificacion, contraseña, generoId,identificacionInstitucion}) => {
  return async (dispatch) => {
    const {user} = await createUserWithEmailAndPassword(auth, correoElectronico, contraseña);
    await updateProfile(user, {displayName: nombre + " " + apellido});
    const [rol] = await getDsOptions('rol', {filter: ['esAdministrador','=',true],}).load();
    const ds = getDs('usuario');
    const response = await ds.insert({correoElectronico, nombre, apellido, fechaNacimiento, identificacion, contraseña, identificacionInstitucion, rolId: rol.id, generoId, uid: user.uid});
    console.log(response)
    await dispatch(startLogin(user));
  }
}

export const startLoginWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    await dispatch(startLogin(user))
  }
}

export const startLoginWithGoogle = () => {
  return async (dispatch) => {
    const {user} = await signInWithPopup(auth, googleProvider);
    await dispatch(startLogin(user))
  }
}

export const startLogin = (user) => {
  return async (dispatch) => {
    const whoAmI = await getWhoAmI(user);
    dispatch(setLogin(user.uid, whoAmI))
  }
}

export const startLogout = () => {
    return async (dispatch) => {
      await auth.signOut();
      dispatch(setLogout())
    }
}

const setLogin = (uid, whoAmi) => ({type: types.setLogin, payload: {uid, whoAmi}})
const setLogout = () => ({type: types.setLogout, payload: {}})

export const refreshWhoAmI = () => {
  return async (dispatch) => {
    dispatch({
      type: types.setWhoAmI,
      payload: {
        whoAmi: await getWhoAmI()
      }
    })
  }
}

export const authReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case types.setWhoAmI:
      return {
        ...state,
        whoAmi: payload.whoAmi,
      }
    case types.setLogin:
      return {
        ...state,
        uid: payload.uid,
        whoAmi: payload.whoAmi,
      }
    case types.setLogout:
      return {}
    default:
      return state;
  }
}
