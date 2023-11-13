import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Easing, Text, Image } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import Screen from '../components/Screen';
import colors from '../config/colors';
import assets from '../config/assets';
import Question from '../components/Question';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const {width, height} = Dimensions.get('window');
const radius = height*0.45*0.26;
const circumference = 2*Math.PI*radius;
const lineWidth = width*0.7;

const lineTime = 5;
const circleTime = 30;

const quiz = [
    {
        question: 'What phenomenon does dark energy create in our universe?',
        option1: assets.black_hole,
        option2: assets.expansion
    },
    {
        question: 'What came first: the chicken or the egg?',
        option1: assets.chicken,
        option2: assets.egg
    },
    {
        question: 'Would you know how to use this?',
        option1: assets.yes,
        option2: assets.no
    },
    {
        question: 'What do the widows do to chosen humans?',
        option1: assets.fertilize,
        option2: assets.eat
    },
    {
        question: 'Will you kill one person to save many?',
        option1: assets.yes,
        option2: assets.no
    },
    {
        question: 'Placeholder?',
        option1: assets.yes,
        option2: assets.no
    }
]

function CountDownQuiz({ setQuizFinished, setQuizPassed }) {
    const video = useRef(null);
    const circleRef = useRef(null);
    const lineRef = useRef(null);
    
    const animatedValueCircle = useRef(new Animated.Value(0)).current;
    const animatedValueLine = useRef(new Animated.Value(0)).current;

    const secondsCircle = useRef(new Animated.Value(circleTime)).current;
    const [secondsCircleText, setSecondsCircleText] = useState(circleTime.toString());
    const secondsLine = useRef(new Animated.Value(lineTime)).current;
    const [secondsLineText, setSecondsLineText] = useState(lineTime.toString());

    const millisecondsLine = useRef(new Animated.Value(10)).current;
    const [millisecondsLineText, setmilliSecondsLineText] = useState('00');
    const millisecondsCircle = useRef(new Animated.Value(10)).current;
    const [millisecondsCircleText, setmilliSecondsCircleText] = useState('00');

    const [questionCount, setQuestionCount] = useState(0);
    const [lineTimerFinished, setLineTimerFinished] = useState(false);
    const [circleTimerFinished, setCircleTimerFinished] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const millisecondsLineAnimation = () => {
        millisecondsLine.setValue(10)
        Animated.loop(
            Animated.timing(millisecondsLine, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            {
                iterations: lineTime
            }
        ).start();
    }
    const millisecondsCircleAnimation = () => {
        millisecondsCircle.setValue(10)
        Animated.loop(
            Animated.timing(millisecondsCircle, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            {
                iterations: circleTime
            }
        ).start();
    }

    const secondsCircleAnimation = () => {
        secondsCircle.setValue(circleTime)
        Animated.timing(secondsCircle, {
            toValue: 0,
            duration: circleTime*1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const secondsLineAnimation = () => {
        secondsLine.setValue(lineTime);
        Animated.timing(secondsLine, {
            toValue: 0,
            duration: lineTime*1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const circelAnimation = () => {
        animatedValueCircle.setValue(0)
        Animated.timing(animatedValueCircle, {
            toValue: circumference,
            duration: circleTime*1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setCircleTimerFinished(true);
        });
    }

    const lineAnimation = () => {
        animatedValueLine.setValue(0)
        Animated.timing(animatedValueLine, {
            toValue: lineWidth,
            duration: lineTime*1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setLineTimerFinished(true);
            setCircleTimerFinished(false);
            circelAnimation();
            secondsCircleAnimation();
            millisecondsCircleAnimation();
        });
    }

    const displayCircleTimerText = () => {
        var firstPart, secondPart;
        secondsCircleText.toString().length==2 ? firstPart='00:'+secondsCircleText : firstPart='00:0'+secondsCircleText;
        millisecondsCircleText.toString().length!=2 ? secondPart=':00' : secondPart=':'+millisecondsCircleText;

        return firstPart+secondPart;
    }

    const handleOption1 = () => {
        if(questionCount<5) setQuestionCount(questionCount+1);
        if(questionCount >= 1)
            setCorrectAnswersCount(correctAnswersCount+1);
    }

    const handleOption2 = () => {
        if(questionCount<5) setQuestionCount(questionCount+1);
        if(questionCount <= 1)
            setCorrectAnswersCount(correctAnswersCount+1);
    }

    useEffect(() => {
        // console.log('new session')
        setQuestionCount(0);
        setCorrectAnswersCount(0);
        setLineTimerFinished(false);
        setCircleTimerFinished(false);
        animatedValueCircle.setValue(0);
        secondsCircle.setValue(circleTime)
        millisecondsCircle.setValue(10)
        animatedValueLine.setValue(0);
        secondsLine.setValue(lineTime)
        millisecondsLine.setValue(10)

        lineAnimation();
        secondsLineAnimation();
        millisecondsLineAnimation();
    },[])

    useEffect(() => {
        // console.log('count',questionCount)
        if(circleTimerFinished){
            setQuizFinished(true);
            if(correctAnswersCount == 5)
                setQuizPassed(true);
            else setQuizPassed(false);
        }
    },[circleTimerFinished])

    useEffect(() => {
        const idCircle = secondsCircle.addListener((v) => {
            setSecondsCircleText(Math.floor(v.value));
        })
        const idLine = secondsLine.addListener((v) => {
            setSecondsLineText(Math.floor(v.value));
        })
        const idMilliLine = millisecondsLine.addListener((v) => {
            setmilliSecondsLineText(Math.floor(v.value)*10);
        })
        const idMilliCircle = millisecondsCircle.addListener((v) => {
            setmilliSecondsCircleText(Math.floor(v.value)*10);
        })

        return () => {
            secondsCircle.removeListener(idCircle);
            secondsLine.removeListener(idLine)
            millisecondsLine.removeListener(idMilliLine);
            millisecondsCircle.removeListener(idMilliCircle);
        }
    }, [secondsCircle,secondsLine,millisecondsLine, millisecondsCircle]);

    return (
        <Screen style={styles.backGround}>
            <View style={styles.upperHalf}>
                <View style={styles.logoContainer}>
                <Image style={styles.logo} source={assets.logo}/>
                </View>
                <View style={styles.circularCountdown}>
                    <Svg>
                        <Circle cx="50%" cy="50%" r={radius+radius*0.6*0.5+5} stroke="red" strokeWidth="2.5" fill="none" />
                        <AnimatedCircle
                            ref={circleRef}
                            cx="50%" cy="50%" r={radius} stroke="lightblue" strokeWidth={radius*0.6} fill="none" 
                            strokeDasharray={circumference}
                            strokeDashoffset={animatedValueCircle}
                        />
                        <Circle cx="50%" cy="50%" r={radius-radius*0.6*0.5-5} stroke="red" strokeWidth="2.5" fill="none" />
                    </Svg>
                    <Animated.Text style={styles.circleTimer}>
                        {displayCircleTimerText()}
                    </Animated.Text>
                </View>
            </View>
            <View style={styles.lowerHalf}>
                {lineTimerFinished ? <Question
                    question={quiz[questionCount].question}
                    options={[quiz[questionCount].option1,quiz[questionCount].option2]}
                    handleOption1={handleOption1}
                    handleOption2={handleOption2}
                    graphics={questionCount==2 ? true : false}
                    questionCount={questionCount}>
                </Question> : 
                <View style={styles.items}>
                    <Animated.Text style={styles.getReadyTimer}>
                        {millisecondsLineText.toString().length!=2 ? '00:0'+secondsLineText+':00' : '00:0'+secondsLineText+':'+millisecondsLineText}
                    </Animated.Text>
                    <View style={styles.rectangleCountDown}>
                        <Svg>
                        <AnimatedLine x1="100%" y1="50%" x2="0" y2="50%" stroke="lightblue" strokeWidth="100%"
                        ref={lineRef}
                        strokeDasharray={lineWidth}
                        strokeDashoffset={animatedValueLine}/>
                        </Svg>
                    </View>
                    <Text style={styles.getReadyText}>GET READY!</Text>
                </View>}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    backGround: {
        flex: 1
    },
    circularCountdown: {
        width: '90%',
        height: '90%',
        // backgroundColor: 'rgba(52, 52, 52, 0.7)',
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleTimer: {
        position: 'absolute',
        fontSize: radius/4,
        color: 'dodgerblue'
    },
    getReadyText: {
        fontSize: radius/3.5,
        color: 'dodgerblue',
        marginTop: 20
    },
    getReadyTimer: {
        fontSize: radius/3.5,
        color: 'dodgerblue',
        marginBottom: 10
    },
    items: {
        width: '100%',
        height:'50%',
        // flex: 1/2,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30%'
    },
    logo: {
        width: '80%',
        height: '80%',
    },
    logoContainer: {
        position: 'absolute',
        width: '35%',
        height: '50%',
        right: -30,
        top: -5,
    },
    lowerHalf: {
        // flex: 1/2,
        width: '100%',
        height: '55%',
        // backgroundColor: colors.primary,
        backgroundColor: colors.black,
    },
    rectangleCountDown: {
        width: '70%',
        height: 50,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'red'
    },
    upperHalf: {
        width: '100%',
        height: '45%',
        // backgroundColor: colors.secondary,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default CountDownQuiz;