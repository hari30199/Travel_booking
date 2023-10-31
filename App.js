import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {StorageContext} from './src/storageContext/StorageContext';

const App = () => {
  return (
    <NavigationContainer>
      <StorageContext>
        <Navigation />
      </StorageContext>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
