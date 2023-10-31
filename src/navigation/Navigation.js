import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreens from '../screens/DetailsScreens';
import AddTrips from '../screens/AddTrips';
import Destinations from '../screens/Destinations';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreens} />
      <Stack.Screen name="AddTrips" component={AddTrips} />
      <Stack.Screen name="Destinations" component={Destinations} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
