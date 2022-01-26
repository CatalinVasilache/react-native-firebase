import React, {useEffect, useState} from 'react'
import {FlatList, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native'
import styles from './AdminDashboardStyles';
import {firebase} from '../../Firebase/config'
import {useNavigation} from '@react-navigation/native'

export default function AdminDashboard(props) {

    const [entityText, setEntityText] = useState('')
    // const [entities, setEntities] = useState([])
    const navigation = useNavigation()

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.route.params.id

    // useEffect(() => {
    //     if (userID) {
    //         entityRef
    //             .where("authorID", "==", userID)
    //             .orderBy('createdAt', 'desc')
    //             .onSnapshot(
    //                 querySnapshot => {
    //                     const newEntities = []
    //                     querySnapshot.forEach(doc => {
    //                         const entity = doc.data()
    //                         entity.id = doc.id
    //                         newEntities.push(entity)
    //                     });
    //                     setEntities(newEntities)
    //                 },
    //                 error => {
    //                 }
    //             )
    //     }
    // }, [])


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

    // const renderEntity = ({item, index}) => {
    //     return (
    //         <View style={styles.entityContainer}>
    //             <Text style={styles.entityText}>
    //                 {index}. {item.text}
    //             </Text>
    //         </View>
    //     )
    // }

    return (
        <View style={styles.container}>
            <View style={styles.containerButtons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CreateNews')}>
                    <Text style={styles.buttonText}>Create new post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => sendNotificationToAll()}>
                    <Text style={styles.buttonText}>Notify All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Counter')}>
                    <Text style={styles.buttonText}>Counter</Text>
                </TouchableOpacity>
            </View>
            {/*<View style={styles.formContainer}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder='Add new entity'*/}
            {/*        placeholderTextColor="#aaaaaa"*/}
            {/*        onChangeText={(text) => setEntityText(text)}*/}
            {/*        value={entityText}*/}
            {/*        underlineColorAndroid="transparent"*/}
            {/*        autoCapitalize="none"*/}
            {/*    />*/}
            {/*    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>*/}
            {/*        <Text style={styles.buttonText}>Add</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            {/*{entities && (*/}
            {/*    <View style={styles.listContainer}>*/}
            {/*        <FlatList*/}
            {/*            data={entities}*/}
            {/*            renderItem={renderEntity}*/}
            {/*            keyExtractor={(item) => item.id}*/}
            {/*            removeClippedSubviews={true}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*)}*/}
        </View>
    )
}
