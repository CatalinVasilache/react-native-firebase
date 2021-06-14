import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {CounterActions, CounterSelectors} from "../../Reducers/counterRedux";
import styles from './ScoreGuessStyle';
import ScoreGuessStyle from "./ScoreGuessStyle";
import {ScoreGuessActions, ScoreGuessSelectors} from "../../Reducers/scoreGuessRedux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function ScoreGuess({navigation}) {

    const dispatch = useDispatch()
    const homeGoals = useSelector(state => ScoreGuessSelectors.selectHomeGoals(state))
    const awayGoals = useSelector(state => ScoreGuessSelectors.selectAwayGoals(state))
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <Text style={styles.counterTitle}>Ghiceste scorul</Text>

                <View style={styles.counterContainer}>
                    <View style={{
                        // margin: 15,
                        // padding: 20,
                        // width: 80,
                        // fontSize: 40,
                        // borderRadius: 20,
                        // borderWidth: 2,
                        // borderColor: 'black'
                    }}
                    >
                        <TouchableOpacity onPress={() => dispatch(ScoreGuessActions.increaseHomeGoals())}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>{homeGoals}</Text>
                        <TouchableOpacity onPress={() => dispatch(ScoreGuessActions.decreaseHomeGoals())}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{fontSize: 20}}>
                        -
                    </Text>

                    <View style={{
                        // margin: 15,
                        // padding: 20,
                        // width: 80,
                        // fontSize: 40,
                        // borderRadius: 20,
                        // borderWidth: 2,
                        // borderColor: 'black'
                    }}
                    >
                        <TouchableOpacity onPress={() => dispatch(ScoreGuessActions.increaseAwayGoals())}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>{awayGoals}</Text>
                        <TouchableOpacity onPress={() => dispatch(ScoreGuessActions.decreaseAwayGoals())}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => dispatch(ScoreGuessActions.submitScoreGuess())}>
                    <Text style={styles.buttonText}>Trimite scorul</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}