/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './app/Main';
class awsomeShowcase extends Component {
  render() {
    return (
      <Main></Main>
    );
  }
}



AppRegistry.registerComponent('awsomeShowcase', () => awsomeShowcase);
