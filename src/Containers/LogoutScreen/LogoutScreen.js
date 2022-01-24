import React, {useState} from 'react'
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './LogoutScreenStyles';
import {firebase} from '../../Firebase/config'

export default function LogoutScreen({navigation}) {

    const onLogoutPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('sign out')
                // navigation.navigate('LoginScreen', { screen: 'LoginScreen' });
                // navigation.navigate('LoginScreen')
            })
            .catch(error => {
                alert(error)
            })
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log Out</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}