import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';

import WelcomeScreen from './screens/WelcomeScreen';
import {socketHandler, onMessage, send, closeConnection} from './components/SocketCom';
import FactSheetScreen from './screens/FactSheetScreen';
import CountDownQuiz from './screens/CountDownQuiz';
import ScannerScreen from './screens/ScannerScreen';
import AppInfo from './components/AppInfo';
import Question from './components/Question';
import assets from './config/assets';
import LoadingScreen from './screens/LoadingScreen';

//vibrate, pause, vibrate, pause,...
const vibrations = [200,300,400,500,200,400,200,300,400,500,200,400];

const factsSpacehip = [
  {
    fact: 'From a planet called Deila in the Andromeda galaxy',
    icon: assets.queen1_ship1,
  },
  {
    fact: 'Shoots clusters of "humanlike" goo when attacking a planet',
    icon: assets.queen6_ship2,
  },
  {
    fact: 'Travelspeed of 0.99c = 4 Earth weeks per hour',
    icon: assets.queen5_ship3,
  },
  {
    fact: 'Structure made of a material we "do not recognize"',
    icon: assets.queen3_ship4,
  },
  {
    fact: 'Contains several thousand arachno beings',
    icon: assets.ship5,
  },
  {
    fact: 'Believed to be able to produce and travel through a wormhole',
    icon: assets.ship6,
  },
];

const factsQueen = [
  {
    fact: 'From a planet called Deila in the Andromeda galaxy',
    icon: assets.queen1_ship1,
  },
  {
    fact: 'Queen of a species known as the "Widows"',
    icon: assets.queen2,
  },
  {
    fact: 'Based on a matriarchal structure',
    icon: assets.queen3_ship4,
  },
  {
    fact: 'Once upon a time a peaceful species',
    icon: assets.queen4,
  },
  {
    fact: 'Planet hit by a comet from a black hole',
    icon: assets.queen5_ship3,
  },
  {
    fact: 'Infected by a virus called the Theridi',
    icon: assets.queen6_ship2,
  },
];

export default function App() {
  useKeepAwake();
  const [isConnected, setConnected]=useState(false)
  const [trigger, setTrigger] = useState('')

  const [blackScreen, setBlackScreen] = useState(false)
  const [count, setCount] = useState(0);
  const [factSheetFinished, setFactSheetFinished] = useState(false);

  const [quizFinished, setQuizFinished] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [sessionId, setSessionId] = useState('');

  let [isLoaded, setIsLoaded] = useState(false);

  //latency
  const [trigger1sent, setTrigger1sent]=useState(false)
  const [trigger2sent, setTrigger2sent]=useState(false)
  const [trigger3sent, setTrigger3sent]=useState(false)
  const [trigger4sent, setTrigger4sent]=useState(false)

  //preload fonts
  const [fontsLoaded] = useFonts({
    'Digital7mono': assets.digital7,
    'Gadugi': assets.gadugi,
    'Nightingale': assets.nightingale,
  });

  onMessage(setTrigger, sessionId);

  const onScanned = (data) => {
    socketHandler(setConnected, data)
    setSessionId(data.sessionId);
  }

  useEffect(() => {
    // console.log(sessionId);
  },[sessionId])

  useEffect(() => {
    if(trigger == 'trigger1'){
      // trigger latency 1
      if(!trigger1sent){
        let d = new Date();
        let message = {
          kpi: 'latency2',
          which: 'stamp1',
          time: d.getTime()
        };
        send(JSON.stringify(message), sessionId);
        setTrigger1sent(true);
      }

      if (count<12){
        const counterInterval = setInterval(() => {
          setCount(count + 1);
          blackScreen ? setBlackScreen(false) : setBlackScreen(true);
          Vibration.vibrate(vibrations[count]);
        }, vibrations[count]);
        // console.log(count)

        return () => clearInterval(counterInterval);
      }else return;
    }else return;
  }, [count, trigger, blackScreen]);

  //preload videos and pictures
  let cacheResources = async () => {
    const videos = [assets.raygun, assets.yes, assets.no, 
      assets.chicken, assets.egg, 
      assets.black_hole, assets.expansion,
      assets.fertilize, assets.eat,
      assets.queen, assets.mothership,
      assets.logo, assets.background, assets.logo_animated, assets.logo_icon,
      assets.queen1_ship1, assets.queen2, assets.queen3_ship4, assets.queen4,
      assets.queen5_ship3, assets.queen6_ship2, assets.ship5, assets.ship6];

    const cacheVideos = videos.map(video => {
      return Asset.fromModule(video).downloadAsync();
    });

    return Promise.all(cacheVideos);
  }

  useEffect(() => {
    setQuizFinished(false);
    setQuizPassed(false);
    setTrigger('');
    setFactSheetFinished(false);
    setIsLoaded(false);
    setTrigger1sent(false);
    setTrigger2sent(false);
    setTrigger3sent(false);
    setTrigger4sent(false);
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    };

    loadResources();
  },[]);

  if(!isLoaded || !fontsLoaded)
    return <LoadingScreen></LoadingScreen>;



  if(!isConnected && !quizFinished){
    return <ScannerScreen onScanned={onScanned}></ScannerScreen>
    // if(quizFinished)
      // return <WelcomeScreen></WelcomeScreen>
    // else return <CountDownQuiz setQuizFinished={setQuizFinished}></CountDownQuiz>

    // return <CountDownQuiz setQuizFinished={setQuizFinished} setQuizPassed={setQuizPassed}></CountDownQuiz>
    // return <LoadingScreen></LoadingScreen>
    // return <FactSheetScreen facts={factsQueen} videoFile={assets.queen}></FactSheetScreen>
    // return <FactSheetScreen facts={factsSpacehip} videoFile={assets.mothership}></FactSheetScreen>
    
  }else{
    // return <WelcomeScreen></WelcomeScreen>
    switch(trigger){
      case 'trigger1':        
        if(blackScreen) return <View style={styles.blackScreen}></View>
        else return <WelcomeScreen></WelcomeScreen>
        break;
      case 'trigger2':
        // trigger latency
        if(!trigger2sent){
          let d = new Date();
          let message = {
            kpi: 'latency3',
            which: 'stamp1',
            time: d.getTime()
          };
          send(JSON.stringify(message), sessionId);
          setTrigger2sent(true);
        }
        return <FactSheetScreen facts={factsQueen} videoFile={assets.queen}></FactSheetScreen>
      case 'trigger3':
        // trigger latency
        if(!trigger3sent){
          let d = new Date();
          let message = {
            kpi: 'latency4',
            which: 'stamp1',
            time: d.getTime()
          };
          send(JSON.stringify(message), sessionId);
          setTrigger3sent(true);
        }
        setTimeout(() => {
          setFactSheetFinished(true);
        }, 15000);
        if(factSheetFinished) return <WelcomeScreen></WelcomeScreen>
        else return <FactSheetScreen facts={factsSpacehip} videoFile={assets.mothership}></FactSheetScreen>
        break;
      case 'trigger4':
        // trigger latency
        if(!trigger4sent){
          let d = new Date();
          let message = {
            kpi: 'latency5',
            which: 'stamp1',
            time: d.getTime()
          };
          send(JSON.stringify(message), sessionId);
          setTrigger4sent(true);
        }
        if(quizFinished){
          if(!quizPassed){
            setQuizPassed(true);
            let d = new Date();
            let message = {
              kpi: 'failed',
              which: 'stamp1',
              time: d.getTime()
            };
            send(JSON.stringify(message), sessionId);
            // send('failed', sessionId);
          }
          closeConnection(setConnected);
          return <WelcomeScreen></WelcomeScreen>
        }else return <CountDownQuiz setQuizFinished={setQuizFinished} setQuizPassed={setQuizPassed}></CountDownQuiz>
        break;
      default:
        return <WelcomeScreen></WelcomeScreen>
    }
  }
}

const styles = StyleSheet.create({
  blackScreen: {
    flex: 1,
    backgroundColor: 'black'
  }
});
