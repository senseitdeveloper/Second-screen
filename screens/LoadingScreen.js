import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

import Screen from '../components/Screen';

const {width, height} = Dimensions.get('window');
const fontSize = height*0.04;
const indicatorSize = height*0.1;

function LoadingScreen(props) {
    return (
        <Screen style={styles.screen}>
            <UIActivityIndicator color='white' size={indicatorSize} style={styles.indicator} />
            <Text style={styles.text}>Loading...</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1/3
    },
    screen: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        // textTransform: 'uppercase',
        color: 'aquamarine',
        fontSize: fontSize
    },
})

export default LoadingScreen;