import React, { useRef } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import colors from '../config/colors';
import assets from '../config/assets';

const {width, height} = Dimensions.get('window');
const logoSize = width*0.5;


function WelcomeScreen(props) {
    const video = useRef(null);
    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.image} source={assets.logo} /> */}
            <Video
                ref={video}
                style={styles.video}
                resizeMode='stretch'
                // source={{uri: assets.mothership_uri}}
                source={assets.logo_animated}
                isLooping
                shouldPlay
            />
            {/* <AppButton title='CLICK ME' backgroundColor={colors.primary} onPress={onPressClickMe}></AppButton> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 50
    },
    video: {
        width: logoSize,
        height: logoSize,
        marginBottom: 50,
        backgroundColor: 'white'
    },
})

export default WelcomeScreen;