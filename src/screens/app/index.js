import {Root} from 'native-base';
import React from 'react';
import Navigation from '../../navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Root>
      <Navigation />
      <Toast ref={ref => Toast.setRef(ref)} />
    </Root>
  );
};

export default App;
