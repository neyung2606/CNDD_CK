import React from 'react';
import {View, Text, Button} from 'react-native';
import { _navigation } from '../../constants';

const Home = (props) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button title="Navigation" onPress={() => props.navigation.navigate(_navigation.TestScreen)} />
    </View>
  );
};

export default Home;
