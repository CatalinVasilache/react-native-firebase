import React, {useEffect, useState} from 'react'
import {FlatList, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native'
import styles from './HomeScreenStyles';
import {firebase} from '../../firebase/config'
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants'

export default function HomeScreen(props, {navigation}) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {

        (() => {
            registerForPushNotificationsAsync()
            console.log('register for push notifications')
        })()
    }, [])

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const registerForPushNotificationsAsync = async () => {
        console.log('function: register for push notifications')
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            console.log('save token')
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
        if (token) {
            console.log('make call to firestore')
            const res = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({token}, {merge: true});
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const sendNotification = async (token) => {
        const message = {
            to: token,
            sound: 'default',
            title: 'Hello my friend!',
            body: 'This is to show you my appreciation',
            data: {someData: 'goes here'},
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    const sendNotificationToAll = async () => {
        const users = await firebase.firestore().collection('users').get()
        users.docs.map(user => sendNotification(user.data().token))
    }

    const renderEntity = ({item, index}) => {
        console.log(item)
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => sendNotification(token)}>
                <Text style={styles.buttonText}>Notify</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MementoScreen')}>
                <Text style={styles.buttonText}>Notify All</Text>
            </TouchableOpacity>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}