import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class awsomeShowcase extends Component {
  render() {
    return (
      <Main></Main>
    );
  }
}


AppRegistry.registerComponent('awsomeShowcase', () => awsomeShowcase);
