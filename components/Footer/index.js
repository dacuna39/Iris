import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Footer extends React.Component {
    render() {
      return (
      <View style={styles.container}>
          
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    backgroundColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: '5%',
  },
});