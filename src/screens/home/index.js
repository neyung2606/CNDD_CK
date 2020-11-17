import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';

const Home = ({navigation}) => {
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate(_navigation.SignIn);
  };
  return (
    <View>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
