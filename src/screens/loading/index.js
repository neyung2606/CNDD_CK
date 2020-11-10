import React from 'react';
import {StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import {appPath, _navigation} from '../../constants';

const Loading = () => {
  return (
    <SafeAreaView style={styles.linearGradient}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={require('../../assets/img/background.jpg')}
        style={styles.imgStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgStyle: {
    flex: 1,
    resizeMode: 'contain',
    width: 300,
  },
});

export default Loading;
