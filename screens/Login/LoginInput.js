import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import SignupButton from '../../components/Buttons/SignupButton';
import EmailInput from '../../components/Input/EmailInput';
import PhoneInput from '../../components/Input/PhoneInput';
import LoginLoading from '../../components/Misc/LoginLoading';

export default function LoginInput({ handleSignup }) {
    const [inputType, setInputType] = React.useState('phone')
    const [loading, setLoading] = React.useState(false);

    const handleToggle = (inputType) => {
        setInputType(inputType)
    }


    const handleLoading = () => {
        setLoading(!loading)        
    }

    return (
        <View style={styles.container}>            
            {
                (!loading && inputType === 'phone') && (
                    <PhoneInput toggleInput={handleToggle} toggleLoading={handleLoading}/>
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
