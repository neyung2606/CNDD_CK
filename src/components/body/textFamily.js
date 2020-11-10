import React from 'react';
import {Text} from 'react-native';
import {stylesBody} from '../../../styles';

const SPText = ({style, children, numberOfLines, onPress}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{...stylesBody.text, ...style}}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export {SPText};
