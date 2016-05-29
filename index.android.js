
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/Home';

class awsomeShowcase extends Component {
  render() {
    return (
      <App></App>
    );
  }
}



AppRegistry.registerComponent('awsomeShowcase', () => awsomeShowcase);
