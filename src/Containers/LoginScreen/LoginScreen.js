import React, {useState} from 'react'
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './LoginScreenStyles';
import {firebase} from '../../Firebase/config'
import {CounterActions} from "../../Reducers/counterRedux";
import {AuthActions, AuthSelectors} from "../../Reducers/authRedux";
import {useDispatch, useSelector} from "react-redux";

export default function LoginScreen({navigation}) {

    const email = useSelector(state => AuthSelectors.selectEmail(state))
    const password = useSelector(state => AuthSelectors.selectPassword(state))
    const dispatch = useDispatch()
    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationScreen')
    }

    const onLoginPress = () => {
        dispatch(AuthActions.logInAttempt())
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => dispatch(AuthActions.setEmail(text))}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => dispatch(AuthActions.setPassword(text))}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress}
                                                                                 style={styles.footerLink}>Sign
                        up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
