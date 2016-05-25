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

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MyTabBar from './MyTabBar';
import SimpleGesture from './SimpleGesture';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim:new Animated.Value(0)
    }
    this.currentY = 0;
  }
  _onHomeClick(){
    console.log(this);
    console.log(this._input.props.style);
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      // Only respond to movements if the gesture is a swipe up
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e,gs);
        console.log('isSwipeUp ', sgs.isSwipeUp());
        console.log('isSwipeRight() ', sgs.isSwipeRight());
        return sgs.isSwipeUp();
      }
    });
  }

  render() {
    setInterval(()=>{
        Animated.timing(          // Uses easing functions
           this.state.fadeAnim,    // The value to drive
           {toValue: 0},           // Configuration
         ).start();
      },1000);
    return(
      <View
        style={styles.container}
        {...this._panResponder.panHandlers} >
        <ScrollableTabView
          style={styles.container}
          tabBarPosition="bottom"  >
          <View style={{flex: 1}} tabLabel='iOS'>
            <Animated.View style={{backgroundColor: 'red', height: this.state.fadeAnim.interpolate({
              inputRange:[0,1],
              outputRange:[10,30]
            })}} ></Animated.View>
            <ScrollView
              style={{flex: 1}}
             >
              <Icon name='social-apple' color='#DBDDDE' size={300} style={styles.icon} />
              <Icon name='social-apple-outline' color='#DBDDDE' size={300} style={styles.icon} />
              <Icon name='ipad' color='#DBDDDE' size={300} style={styles.icon} />
              <Icon name='iphone' color='#DBDDDE' size={300} style={styles.icon} />
              <Icon name='ipod' color='#DBDDDE' size={300} style={styles.icon} />
              <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress={() => this._onHomeClick()}>
                <View>
                  <Text>首页</Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
          </View>
          <ScrollView tabLabel='Android'>
            <Icon name='social-android' color='#A4C639' size={300} style={styles.icon} />
            <Icon name='social-android-outline' color='#A4C639' size={300} style={styles.icon} />
            <Icon name='android-playstore' color='#A4C639' size={300} style={styles.icon} />
          </ScrollView>
        </ScrollableTabView>
      </View>
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
