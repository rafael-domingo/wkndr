import firebase from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
    // firebase config
  };

try {
    firebase.initializeApp(firebaseConfig);      
} catch (error) {
    
    console.log(error)
}

export default firebase;

