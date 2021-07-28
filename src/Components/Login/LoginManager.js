import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const handleGoogleSignIn = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(GoogleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err)
            console.log(err.message)
        })
};


export const createUserWithEmailAndPassword = (name, email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserInfo(name);
            const signedInUser = res.user;
               signedInUser.name = name;
               signedInUser.success = true;
               signedInUser.error = '';
            return signedInUser;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log(error.message);
            return newUserInfo;
        })
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const signedInUser = res.user;
            signedInUser.name = signedInUser.displayName;
            signedInUser.error = '';
            signedInUser.success = true;
            return signedInUser;
        })
        .catch(error => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
};

export const updateUserInfo = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    })
        .then(res => {
            console.log("username updated successfully")
        })
        .catch(error => {
            console.log(error)
        })
};