import './App.css';
//import firebase from 'firebase/compat/app'
//import 'firebase/compat/auth'

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

import { useEffect, useState } from 'react';

function App() {
    const [auth, setAuth] = useState(
        false || window.localStorage.getItem('auth') === 'true'
    );
    const [token, setToken] = useState('');

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuth(true);
                window.localStorage.setItem('auth', 'true');
                user.getIdToken().then((token) => {
                    setToken(token);
                });
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    const loginWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <div className="App">
            {auth ? (
                <h1>Logged In</h1>
            ) : (
                <button onClick={loginWithGoogle}>Login with Google</button>
            )}
        </div>
    );
}

export default App;
