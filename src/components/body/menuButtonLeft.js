import React, {FunctionComponent} from 'react';
import {SPButton} from './button';
import { Image } from 'react-native';

const MenuButtonLeft = (props) => {
  const {style} = props;
  return (
    <SPButton style={style} onPress={props.onPress}>
      <Image style={{width: 30, height: 30}} source={require('../../assets/icons/header/menu-button.png')}/>
    </SPButton>
  );
};

export {MenuButtonLeft};
