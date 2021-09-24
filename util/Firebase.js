import firebase from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
    // firebaseConfig
  };

try {
    firebase.initializeApp(firebaseConfig);      
} catch (error) {
    
    console.log(error)
}

export default firebase;

