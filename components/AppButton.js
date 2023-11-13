import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function AppButton({title='Click', backgroundColor=colors.primary, onPress }) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPress={onPress}>
            <View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        borderRadius: 25,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default AppButton;