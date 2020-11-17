import React, {useState, useEffect} from 'react';
import {Header, BackButton, MenuButtonLeft} from '../../components';
import Loading from '../../screens/loading';
import Home from '../../screens/home';
import TestScreen from '../../screens/testscreen'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {header} from './styles';

const headerComponent = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Header
      title={title}
      LeftButton={previous ? BackButton : MenuButtonLeft}
      style={header}
      leftPress={previous ? navigation.goBack : navigation.toggleDrawer}
    />
  );
};

const splashScreen = {
  slaph: {
    screen: Loading,
    options: {
      header: () => {},
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    },
  },
};

const appScreen = {
  Home: {
    screen: Home,
    options: {
      title: 'Home',
    },
  },
  TestScreen: {
    screen: TestScreen,
    options: {
      title: 'TestScreen',
    },
  },
};

const configSwitchScreen = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

export const AppStack = () => {
  const [isLoadApp, setIsLoadApp] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadApp(false);
    }, 1000);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        header: headerComponent,
      }}
      headerMode={'screen'}
      initialRouteName="Home">
      {Object.entries({...(isLoadApp ? splashScreen : appScreen)}).map(
        ([name, component]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component.screen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              ...component.options,
            }}></Stack.Screen>
        ),
      )}
    </Stack.Navigator>
  );
};
