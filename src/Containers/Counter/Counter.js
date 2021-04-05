import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';;
import {useDispatch, useSelector} from "react-redux";
import {CounterActions, CounterSelectors} from "../../Reducers/counterRedux";

export default function Counter({navigation}) {

    const dispatch = useDispatch()
    const counter = useSelector(state => CounterSelectors.selectCounter(state))
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.counterTitle}>Counter</Text>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => dispatch(CounterActions.increaseCounter())}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <Text style={styles.counterText}>{counter}</Text>

                <TouchableOpacity onPress={() => dispatch(CounterActions.decreaseCounter())}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity title="Go back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterTitle: {
        fontFamily: 'System',
        fontSize: 32,
        fontWeight: '700',
        color: '#000',
    },
    counterText: {
        fontFamily: 'System',
        fontSize: 36,
        fontWeight: '400',
        color: '#000',
    },
    buttonText: {
        fontFamily: 'System',
        fontSize: 50,
        fontWeight: '300',
        color: '#007AFF',
        marginLeft: 40,
        marginRight: 40,
    },
});