import React from 'react';
import {SPButton} from './button';

import BackIcon from '../../assets/icons/header/back.svg';

const BackButton = (props) => {
  const {style} = props;
  return (
    <SPButton style={style} onPress={props.onPress}>
      <Image
        style={{width: 30, height: 30}}
        source={require('../../assets/icons/header/back.png')}
      />
    </SPButton>
  );
};

export {BackButton};
