import React from 'react';
// xài drawer thì bật
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './App';

const Drawer = createDrawerNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={AppStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
