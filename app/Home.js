import React, { Component,  } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions
} from 'react-native';

import ZJTabView from './common/ZJTabView';

class Home extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <ZJTabView>
        <Text style={[styles.show,{backgroundColor: 'green', flex: 1,}]}>
          123333
        </Text>
        <Text style={{backgroundColor: 'green', flex: 1, }}>
          22222222
        </Text>
        <View style={{backgroundColor: 'green', flex: 1}}>
          <TextInput style={{height: 40, borderColor: 'gray'}}></TextInput>
        </View>

        <View style={{flex:1}}>
          <MyLongScrollView ></MyLongScrollView>
        </View>

        <Text style={{backgroundColor: 'green', flex: 1}}>
          55555555
        </Text>
      </ZJTabView>
    );
  }
}

class MyLongScrollView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateContents() {
    let contents = [];
    for (let i = 0; i < 20; i++) {
      contents.push(
        <View key={i}>
          <Text>My Awesome Content {i}</Text>
          <TextInput style={{height: 40, borderColor: 'gray'}}></TextInput>
        </View>
      );
    }

    return contents;
  }

  onScroll(e) {
    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;

    const { getBarRef } = this.context;
    getBarRef(y);
    // console.log(this.props.zj);
    // this.props.zj.setBarHeight(y);
  }

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={16}
        style={{ flex: 1}}
        contentContainerStyle={{ alignItems: 'center' }}>
        {this.generateContents()}
      </ScrollView>
    );
  }
}
MyLongScrollView.contextTypes = {
  getBarRef: React.PropTypes.func,
  color: React.PropTypes.string
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  show: {
   flex: 1,
   position: 'relative',
   backgroundColor:'transparent'
   },
   hide: {
     position: 'absolute',
     top: 10000
   }
});

export{ Home as default };
