import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCzMkiJAHt2K3EURrmTrPx7-zKGww31yNk",
    authDomain: "votapoint.firebaseapp.com",
    projectId: "votapoint",
    storageBucket: "votapoint.appspot.com",
    messagingSenderId: "470563983326",
    appId: "1:470563983326:web:95907a50c1bb587958574f",
    measurementId: "G-X5N119Q0VG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.languageCode = 'en';
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');

export const authWith = (provider) => signInWithPopup(auth, provider);
