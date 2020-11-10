import React from 'react';
import {Text, View} from 'react-native';
import { SPText } from './textFamily';

const Header = (props) => {
  const {style, title, LeftButton} = props;
  return (
    <View style={style.container}>
      <LeftButton style={style.menu} onPress={props.leftPress} />
      <SPText style={style.title}>{title}</SPText>
    </View>
  );
};

export {Header};
