import { React} from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';

import colors from '../config/colors';

const {width, height} = Dimensions.get('window');
const iconDiskSize = height*0.06;
const iconSize = iconDiskSize*0.7;
const textSize = width*0.0475;
const stickLength = width*0.095;

function FactSheetItem({ icon, text }) {

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.iconDisc}>
                    <Image style={styles.icon} source={icon}/>
                </View>
                <View style={styles.stick}></View>
            </View>
            <View style={styles.factContainer}>
                <Text style={styles.text} numberOfLines={2}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1/7,
        flexDirection: 'row'
    },
    factContainer: {
        flex: 4/5,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // backgroundColor: 'red'
    },
    icon: {
        width: iconSize,
        height: iconSize
    },
    iconContainer: {
        backgroundColor: 'rgba(0, 0, 139, 0.7)',
        flex: 1/4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconDisc: {
        width: iconDiskSize,
        height: iconDiskSize,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: iconDiskSize/2,
        marginRight: 0
    },
    stick: {
        width: Dimensions.get('window').width/6-stickLength,
        // width: 5,
        height: 5,
        position: 'absolute',
        left: Dimensions.get('window').width/6,
        backgroundColor: colors.white,
    },
    text: {
        color: colors.white,
        fontSize: textSize,
        marginLeft: 5,
        textAlign: 'left',
        fontFamily: 'Gadugi',
        // fontWeight: 'bold',
        // transform: scale(1, 5)
    }
})

export default FactSheetItem;