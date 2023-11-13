import React from 'react';
import { useRef} from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Video } from 'expo-av';

import Screen from '../components/Screen';
import FactSheetItem from '../components/FactSheetItem';
import colors from '../config/colors';
import assets from '../config/assets';

const {width, height} = Dimensions.get('window');
const headerFontSize = width*0.13;
const logoSize = height*0.15;
const factIconSize = height*0.05;

function FactSheetScreen({facts, videoFile}) {
    const video = useRef(null);
    
    return (
        <Screen style={styles.screen}>
            <View style={styles.upperContainer}>
                <View style={styles.videoContainer}>
                    <Video
                        ref={video}
                        style={styles.video}
                        resizeMode='contain'
                        // source={{uri: assets.mothership_uri}}
                        source={videoFile}
                        isLooping
                        shouldPlay
                    />
                </View>
                <Image style={styles.logo} source={assets.logo}/>
            </View>
            <ImageBackground style={styles.lowerBackgroundImage} source={assets.background}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.factIcon} source={assets.factIcon}/>
                    </View>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>QUICK FACTS</Text>
                    </View>
                </View>
                <FactSheetItem icon={facts[0].icon} text={facts[0].fact}></FactSheetItem>
                <FactSheetItem icon={facts[1].icon} text={facts[1].fact}></FactSheetItem>
                <FactSheetItem icon={facts[2].icon} text={facts[2].fact}></FactSheetItem>
                <FactSheetItem icon={facts[3].icon} text={facts[3].fact}></FactSheetItem>
                <FactSheetItem icon={facts[4].icon} text={facts[4].fact}></FactSheetItem>
                <FactSheetItem icon={facts[5].icon} text={facts[5].fact}></FactSheetItem>
            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    factIcon: {
        // backgroundColor: 'white',
        tintColor: 'white',
        width: factIconSize,
        height: factIconSize,
    },
    header: {
        width: '100%',
        flex: 1/7,
        flexDirection: 'row'
    },
    headerTitle: {
        color: colors.white,
        fontSize: headerFontSize,
        fontFamily: 'Digital7mono'
    },
    headerTitleContainer: {
        flex: 4/5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.7)'
    },
    iconContainer: {
        backgroundColor: 'blue',
        flex: 1/4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: logoSize,
        height: logoSize,
        position: 'absolute',
        left: -10,
        top: -20
    },
    lowerBackgroundImage: {
        flex: 1,
    },
    screen: {
        backgroundColor: 'black'
    },
    upperContainer: {
        width: '100%',
        height: '31%',
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
    },
    videoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default FactSheetScreen;