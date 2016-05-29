import React, { Component,  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Image,
  View
} from 'react-native';

const REF_BAR = 'REF_BAR';

class ZJTabView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShow: false,
      index: 0
    }
    this.value = new Animated.Value(0);
    this._sizeLimit = sizeLimit(-48, 0);

  }
  getChildContext() {
    return {
      getBarRef: this.setBarHeight.bind(this),
      color: "purple"
    };
  }
  getBarRef() {
    return this.refs[REF_BAR];
  }

  show(enable : true, duration : 1000) {
   const toValue = enable ? 0 : -48;
   Animated.timing(this.value, {
     duration: duration,
     toValue
   }).start();
   this.setState({
     isShow: !this.state.isShow
   })
  }

  setBarHeight(value) {
   //const { size } = this.props;
   const size = 0;
   const actualValue = this._sizeLimit.process(value) - size;
   this.value.setValue(actualValue);
  }

  render() {
    let children = this.props.children;
    if (!children.length) {
            throw new Error("at least two child component are needed.");
    }
    return(
      <View style={styles.container} ref={REF_BAR} >
        <TouchableOpacity
          onPress={()=>{
              this.show(this.state.isShow, 300);
            }
          }
        >
          <Image style={{backgroundColor: 'red'}} source={require('../img/ic_bottomtabbar_feed.png')}/>
        </TouchableOpacity>
        {
          children.map((c,i)=>{
            let style;
            if(i == this.state.index){
              style = styles.show;
            } else {
              style = styles.hide;
            }
            return(
              <View key={i} style={[style, {height:height-100}]}>
                {this.props.children[i]}
              </View>
            )
          })
        }
        <Animated.View  style={[styles.bar, {bottom: this.value}]}>
          {
            children.map((c,i)=>{
              return(
                <TouchableOpacity key={i} style={styles.barItem} onPress={()=>{
                  this.setState({index:i})
                }} >
                  <Image style={{backgroundColor: 'red'}} source={require('../img/ic_bottomtabbar_feed.png')}></Image>
                </TouchableOpacity>
              )
            })
          }
        </Animated.View>
      </View>
    );
  }
}

const sizeLimit = (minValue, maxValue) => {
  let prevValue = 0;
  let delta;

  let actualValue = maxValue;

  return {
    process: (value) => {
      if (value < minValue) {
        value = minValue;
      }

      delta = value - prevValue;
      prevValue = value;

      actualValue -= delta;

      if (actualValue < minValue) {
        actualValue = minValue;
      } else if (actualValue > maxValue) {
        actualValue = maxValue;
      }

      return actualValue;
    },
    //we need to reset because if `show` method is called we need
    //to make sure that the actualValue is set properly to prevent
    //jaggy animation.
    reset: (value) => actualValue = value
  };
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    height: 48,
    width: width,
    backgroundColor: 'red',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.1
  },
  barItem: {
    backgroundColor: 'blue',
    height: 48,
    justifyContent: 'center',
    width: width/5,
    alignItems: 'center'
  },
  show: {
   flex: 1,
   position: 'relative',
   backgroundColor:'transparent'
   },
   hide: {
     flex: 1,
     position: 'absolute',
     top: 10000
   }
});
ZJTabView.childContextTypes = {
  getBarRef: React.PropTypes.func,
  color: React.PropTypes.string
};
export{ ZJTabView as default };
