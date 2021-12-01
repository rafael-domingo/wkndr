import firebase from './Firebase';

// Signout
export const signOut = async () => {
    try {
        const result = await firebase.auth().signOut()
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

// Delete account
export const deleteAccount = async () => {
    try {
        const result = await firebase.auth().currentUser.delete()
        return result
    } catch (error) {
        console.log(error)
        return error

    }
}

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