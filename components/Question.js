import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, FlatList } from 'react-native';
import { Video } from 'expo-av';

import colors from '../config/colors';
import assets from '../config/assets';
import AppVideo from './AppVideo';

const {width, height} = Dimensions.get('window');
const FontSize = width*0.085;
const FontSizeOption = height*0.05;
const buttonSize = width*0.25;

function Question({ question='Hallais', options=['one','two'], handleOption1, handleOption2, graphics=false, questionCount }) {
    const [status, setStatus] = useState({});

    const video_raygun = useRef(null);
    const video_option1 = useRef(null);
    const video_option2 = useRef(null);

    useEffect(() => {
        // console.log(status);
    },[])

    if(questionCount==5)
        return (
            <View style={styles.container}></View>
        )
    else return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question}</Text>
            </View>

            {graphics ? <View style={styles.videoContainer}>
                {/* <Image style={styles.video} source={assets.raygun_pic}/> */}
                {/* <AppVideo file={assets.raygun} style={styles.video} resize={'contain'}></AppVideo> */}
                <Video
                    ref={video_raygun}
                    style={styles.video}
                    resizeMode='contain'
                    source={assets.raygun}
                    isLooping
                    shouldPlay
                    // onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </View> : null}
            
            <View style={[styles.buttonsContainer, {marginTop: graphics ? 0 : '20%'}]}>
                {/* <Image style={styles.buttonVideo} source={assets.logo}/> */}
                <TouchableWithoutFeedback onPress={handleOption1}>
                    {/* <View style={styles.optionContainer}>
                    <Text style={styles.buttonText}>{options[0]}</Text>
                    </View> */}
                    {/* <Image style={styles.buttonVideo} source={assets.logo}/> */}
                    <Video
                        ref={video_option1}
                        style={styles.buttonVideo}
                        resizeMode='stretch'
                        source={options[0]}
                        isLooping
                        shouldPlay
                    />
                    {/* <AppVideo file={assets.yes} style={styles.buttonVideo} resize={'stretch'}></AppVideo> */}
                </TouchableWithoutFeedback>
                {/* <Image style={styles.buttonVideo} source={assets.logo}/> */}
                <TouchableWithoutFeedback onPress={handleOption2}>
                    <Video
                        ref={video_option2}
                        style={styles.buttonVideo}
                        resizeMode='stretch'
                        source={options[1]}
                        isLooping
                        shouldPlay
                        
                    />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        // flex: 1/4,
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-around',
        // marginTop: '20%',
    },
    buttonsVideoContainer: {
        // position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        // backgroundColor: 'rgba(52, 52, 52, 0.0)',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonText: {
        // position: 'absolute',
        color: 'aquamarine',
        fontSize: FontSize,
        textTransform: 'uppercase',
    },
    buttonVideo: {
        width: buttonSize,
        height: buttonSize,
        // backgroundColor: 'white'
    },
    container: {
        flex: 1,   
    },
    optionContainer: {
        // width: '50%',
        // height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white'
    },
    questionContainer: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    questionText: {
        fontSize: FontSize,
        fontFamily: 'Nightingale',
        color: 'aquamarine',
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingHorizontal: 10,
        marginTop: -10,
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
    },
    videoContainer: {
        width: '100%',
        height: '40%',
        // backgroundColor: 'rgba(52, 52, 52, 0.7)',
        // backgroundColor: 'white'
    },
})

export default Question;