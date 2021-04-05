import {firebase} from "../../Firebase/config";

class AuthService {
    logIn = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        return Promise.resolve(firestoreDocument.data())
                        // this.props.navigation.navigate('HomeScreen', {user})
                    })
                    .catch(error => {
                        alert(error)
                        return Promise.reject(error)
                    });
            })
            .catch(error => {
                alert(error)
                return Promise.reject(error)
            })
    }
}

const authService = new AuthService()
export default authService