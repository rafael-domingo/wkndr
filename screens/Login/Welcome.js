import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import LoginButton from '../../components/Buttons/LoginButton';
import SignupButton from '../../components/Buttons/SignupButton';
import Hero from '../../components/Misc/Hero';
import Logo from '../../components/Misc/Logo';
import LoginInput from './LoginInput';

export default function Welcome({ navigation }) {
    const [login, setLogin] = React.useState(false);
    const handleLogin = () => {
        setLogin(true);
    }

    const handleSignup = () => {
        setLogin(false);
    }

    return (
        // <KeyboardAvoidingView 
        //     styles={{flex: 1}}
        //     behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        // >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Hero login={login}/>
                        <Logo />
                    </View>
                    {
                        !login && (
                            <View style={styles.login}>
                                <LoginButton handleClick={handleLogin}/>
                                <SignupButton handleClick={handleLogin} text={false}/>
                            </View>  
                        )
                    }
                    {
                        login && (
                            <View style={styles.input}>                   
                                <LoginInput handleSignup={handleSignup} navigation={navigation}/>
                            </View>
                        )
                    }
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
       
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',     
        backgroundColor: 'black'     
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
