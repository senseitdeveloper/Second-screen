import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../config/colors';

function AppInfo({title='Click', backgroundColor=colors.primary, style }) {
    return (
        <View style={[styles.button, {backgroundColor: backgroundColor}, style]}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 18,
        fontStyle: 'italic'
    }
})

export default AppInfo;