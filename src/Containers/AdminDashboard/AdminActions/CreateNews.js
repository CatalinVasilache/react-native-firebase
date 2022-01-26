import React, {useEffect, useState} from 'react'
import { Keyboard, Text, TouchableOpacity, View, TouchableWithoutFeedback, StatusBar, Platform,
    Alert,
    Image, SafeAreaView } from 'react-native'
import { DefaultTheme, TextInput } from 'react-native-paper'
import styles from './CreateNewsStyles';
import {firebase} from '../../../Firebase/config'
import ImagePicker from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

export default function CreateNews({navigation}) {

    const [postTitle, setPostTitle] = useState('')
    const [postDescription, setPostDescription] = useState('')
    const [contentPadding, setContentPadding] = useState(0)
    const [selectedPictureUri, setSelectedPictureUri] = useState('')
    const entityRef = firebase.firestore().collection('posts')
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source);
                setImage(source);
            }
        });
    };

    const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
    };

    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', keyboardWillHide)

        return () => {
            Keyboard.removeListener('keyboardWillShow', keyboardWillShow)
            Keyboard.removeListener('keyboardWillHide', keyboardWillHide)
        }
    }, [])

    const keyboardWillShow = (e: KeyboardEvent) => {
        setContentPadding(e.endCoordinates.height)
    }

    const keyboardWillHide = () => {
        setContentPadding(0)
        Keyboard.dismiss()
    }

    const onAddButtonPress = () => {
        if (postDescription && postDescription.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                postTitle: postTitle,
                postDescription: postDescription,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setPostDescription('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.container, {paddingBottom: contentPadding}]}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.formContainer}>
                    <TextInput
                        theme={DefaultTheme}
                        multiline={true}
                        style={styles.postTitle}
                        placeholder='Add title'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {
                            setPostTitle(text)}
                        }
                        value={postTitle}
                        mode='outlined'
                        onFocus={() => console.log('on focus')}
                    />
                    <TextInput
                        theme={DefaultTheme}
                        multiline={true}
                        style={styles.postDescription}
                        placeholder='Add description'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {
                            setPostDescription(text)}
                        }
                        value={postDescription}
                        mode='outlined'
                        onFocus={() => console.log('on focus')}
                    />
                    <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
                        <Text style={styles.buttonText}>Pick an image</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        {image !== null ? (
                            <Image source={{ uri: image.uri }} style={styles.imageBox} />
                        ) : null}
                        {uploading ? (
                            <View style={styles.progressBarContainer}>
                                <Progress.Bar progress={transferred} width={300} />
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                                <Text style={styles.buttonText}>Upload image</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
