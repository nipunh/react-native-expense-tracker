
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDE0h9b-NbZPoQ3kxmKkK3Dzfv1Fn-A-mg",
    authDomain: "expensy-69717.firebaseapp.com",
    projectId: "expensy-69717",
    storageBucket: "expensy-69717.appspot.com",
    messagingSenderId: "182102373648",
    appId: "1:182102373648:web:8bc3de0afd2a2be77ae195",
    measurementId: "G-XSY5G4NVBG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}


export { firebase };