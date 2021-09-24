import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import SignupButton from '../../components/Buttons/SignupButton';
import EmailInput from '../../components/Input/EmailInput';
import PhoneInput from '../../components/Input/PhoneInput';
import VerificationInput from '../../components/Input/VerificationInput';
import LoginLoading from '../../components/Misc/LoginLoading';
import { phoneSignIn, phoneVerificationCode } from '../../util/Auth';

export default function LoginInput({ handleSignup, navigation }) {
    const [inputType, setInputType] = React.useState('phone')
    const [loading, setLoading] = React.useState(false);
    const [verificationId, setVerificationId] = React.useState();

    const handleToggle = (inputType) => {
        setInputType(inputType)
    }


    const handleLoading = () => {
        setLoading(!loading)       
        navigation.navigate('User') 
    }

    const handlePhoneInput = (phoneNumber, recaptcha) => {
        phoneSignIn(phoneNumber, recaptcha)
        .then(response => {
            if (response === 'error') {
                console.log('error')
                return
            } else {
                console.log(response)
                setInputType('verification')
                setVerificationId(response)
            }
        })  
        .catch(error => console.log(error))
    }

    const handleVerificationInput = (code) => {
        phoneVerificationCode(code, verificationId)
        .then(response => {
            if (response === 'error') {
                console.log('error')
                return
            } else {
                console.log(response)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>            
            {
                (!loading && inputType === 'phone') && (
                    <PhoneInput 
                        toggleInput={handleToggle} 
                        toggleLoading={handleLoading}
                        handlePhoneInput={handlePhoneInput}
                    />
                )
            }
            {
                (!loading && inputType === 'verification') && (
                    <VerificationInput 
                        toggleInput={handleToggle} 
                        toggleLoading={handleLoading} 
                        handleVerificationInput={handleVerificationInput}
                    />
                )
            }
            {
                (!loading && inputType === 'email') && (
                    <EmailInput toggleInput={handleToggle} toggleLoading={handleLoading}/>
                )
            }
            {
                !loading && (
                    <SignupButton handleClick={handleSignup}/>
                )
            }
            {
                loading && (
                    <LoginLoading />
                )
            }
            <Button
                title="reset"
                onPress={handleLoading}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
