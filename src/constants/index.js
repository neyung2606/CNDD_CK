import { Dimensions } from 'react-native';

export const _navigation = {
  Home: 'Home',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Profile: 'Profile',
  UpdateProfile: 'UpdateProfile',
  ChangePassword: 'ChangePassword',
  Search: 'Search',
  Cart: 'Cart',
  Checkout: 'Checkout',
  Detail: 'Detail',
  Category: 'Category'
};

export const WIDTH_SCREEN = Dimensions.get('screen').width;
export const WIDTH_WIN = Dimensions.get('window').width;
export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export const HEIGHT_WIN = Dimensions.get('window').height;

export const url = "https://evening-wildwood-46158.herokuapp.com"

export * from './theme';
