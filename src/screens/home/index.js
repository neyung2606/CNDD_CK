import React, { useContext } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import { AuthContext } from '../../stores';

const Home = ({navigation}) => {
  const { signOut } = useContext(AuthContext); 

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate(_navigation.SignIn);
  };

  return (
    <View>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
