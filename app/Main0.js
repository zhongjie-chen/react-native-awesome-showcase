import React, { Component,  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  PanResponder,
  Animated,
  View
} from 'react-native';


import SimpleGesture from './SimpleGesture';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
    this.state.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove:  (evt, gestureState) => {
         const { offset, position, } = evt.nativeEvent;
         console.log(offset + "  " + position);
       },
       onPanResponderRelease: (evt, gestureState) => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {toValue: {x: gestureState.dx, y: gestureState.dy}} // Back to zero
         ).start();
       },
       onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        Animated.spring(
          this.state.pan,         // Auto-multiplexed
          {toValue: {x: gestureState.dx, y: gestureState.dy}} // Back to zero
        ).start();
        // gestureState.{x,y}0 现在会被设置为0
       },
    });

  }


  render() {
    return(
      <Animated.View {...this.state.panResponder.panHandlers}  style={[this.state.pan.getLayout(), styles.container, {}]}>
        <View style={{height: 200, backgroundColor: 'red'}}></View>
        <View style={{flex: 1, backgroundColor: 'blue'}}></View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
export{ Main as default };
