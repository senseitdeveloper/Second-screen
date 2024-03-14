import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import AppInfo from '../components/AppInfo';
import Screen from '../components/Screen';

const {width, height} = Dimensions.get('window');
const boundLineLength = '50';
const boundBoxWidth=width/1.5;
const boundLineStroke = '10';
const textWidth = width*0.83;
const textOffsetBottom = height*0.15;

const upperLeft="0,"+boundLineLength+" 0,0 "+boundLineLength+",0";
const upperRight=(boundBoxWidth-boundLineLength)+",0 "+boundBoxWidth+",0 "+boundBoxWidth+","+boundLineLength;
const lowerLeft="0,"+(boundBoxWidth-boundLineLength)+" 0,"+boundBoxWidth+" "+boundLineLength+","+boundBoxWidth;
const lowerRight=(boundBoxWidth-boundLineLength)+","+boundBoxWidth+" "+boundBoxWidth+","+boundBoxWidth+" "+boundBoxWidth+","+(boundBoxWidth-boundLineLength);


function ScannerScreen({ onScanned }) {
    // qr code scanner
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleScanned = ({ type, data }) => {
    if(!scanned){
      setScanned(true)
      console.log(data);
      onScanned(JSON.parse(data))
      // try{
      //   onScanned(JSON.parse(data))
      // } catch(error){
      //   console.log(error)
      // }
    }
  }
  
    return (
        <Screen style={StyleSheet.container}>
          {(hasPermission && hasPermission) ?
            <BarCodeScanner
                style={styles.scannerWrapper}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={handleScanned}
            />
          : null
        }
          
          <View style={styles.bounds}>
          <AppInfo title={'Scan the QR code on the first screen'} style={styles.infoText}></AppInfo>
            <Svg>
              {/* upper left */}
              <Polyline
                points={upperLeft}
                fill="none"
                stroke="white"
                strokeWidth={boundLineStroke}
              />
              {/* upper right */}
              <Polyline
                points={upperRight}
                fill="none"
                stroke="white"
                strokeWidth={boundLineStroke}
              />
              {/* lower left */}
              <Polyline
                points={lowerLeft}
                fill="none"
                stroke="white"
                strokeWidth={boundLineStroke}
              />
              {/* lower right */}
              <Polyline
                points={lowerRight}
                fill="none"
                stroke="white"
                strokeWidth={boundLineStroke}
              />
            </Svg>
          </View>
          
        </Screen>
    );
}

const styles = StyleSheet.create({
    bounds: {
      position: 'absolute',
      width: boundBoxWidth,
      height: boundBoxWidth,
      top: height/1.7-boundBoxWidth/2,
      left: width/2-boundBoxWidth/2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    infoText: {
      position: 'absolute',
      width: textWidth,
      height: 50,
      bottom: boundBoxWidth+textOffsetBottom
    },
    scannerWrapper: {
        width: '100%',
        height: '100%',
    }
})

export default ScannerScreen;