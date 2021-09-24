import firebase from './Firebase';


// PHONE AUTH
export const phoneSignIn = async (phoneNumber, recaptchaVerifier) => {
    console.log(recaptchaVerifier)
    try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier
        )
        return verificationId;
    } catch (error) {
        console.log(error)
        return 'error'
    }
    
}

export const phoneVerificationCode = async (verificationCode, verificationId) => {
    try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        )
        console.log(credential)
        const result = await firebase.auth().signInWithCredential(credential);
        return result;
    } catch (error) {
        console.log(error)
        return 'error'
    }
    
}