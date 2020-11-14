import {StyleSheet} from 'react-native';

const stylesBody = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#031B39',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    width: 170,
    textAlign: 'center',
  },
  primaryColor: {
    backgroundColor: '#5973AF',
  },
  unset: {
    backgroundColor: undefined,
  },
  button: {
    backgroundColor: '#5973AF',
  },
  buttonFocus: {
    backgroundColor: '#088FA5',
  },
  border: {
    borderColor: '#5973AF',
  },
  disabled: {
    opacity: 0.5,
  },
});

export {stylesBody};
