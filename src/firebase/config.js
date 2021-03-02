import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDme50L5S_XkIcowakkdjgIunR2zfinyQI',
    authDomain: 'rnfirebase-c3298.firebaseapp.com',
    databaseURL: 'https://rnfirebase-c3298-default-rtdb.firebaseio.com/',
    projectId: 'rnfirebase-c3298',
    storageBucket: 'gs://rnfirebase-c3298.appspot.com',
    messagingSenderId: '1028130982417',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };