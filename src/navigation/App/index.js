import React, { useState, useEffect } from 'react';
import { Header, BackButton, MenuButtonLeft } from '../../components';
import Loading from '../../screens/loading';
import Home from '../../screens/home';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import Profile from '../../screens/Profile';
import UpdateProfile from '../../screens/UpdateProfile';
import ChangePassword from '../../screens/ChangePassword';
import Search from '../../screens/Search';
import {
	CardStyleInterpolators,
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import { header } from './styles';

const headerComponent = ({ scene, previous, navigation }) => {
	const { options } = scene.descriptor;
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

export const appScreen = {
	Home: {
		screen: Home,
		options: {
			title: 'Home',
			header: headerComponent,
		},
	},
	UpdateProfile: {
		screen: UpdateProfile,
		options: {
			title: 'UpdateProfile',
			header: headerComponent,
		},
	},
	Profile: {
		screen: Profile,
		options: {
			title: 'Profile',
			header: headerComponent,
		},
	},
	ChangePassword: {
		screen: ChangePassword,
		options: {
			title: 'ChangePassword',
			header: headerComponent,
		},
	},
	Search: {
		screen: Search,
		options: {
			title: 'Search',
			header: headerComponent,
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

const authScreen = {
	SignIn: {
		screen: SignIn,
		options: {
			title: 'SignIn',
			header: () => {},
		},
	},
	SignUp: {
		screen: SignUp,
		options: {
			title: 'SignUp',
			header: () => {},
		},
	},
};

const Stack = createStackNavigator();

export const authStack = () => {
	const [isLoadApp, setIsLoadApp] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadApp(false);
		}, 1000);
	}, []);

	return (
		<Stack.Navigator headerMode={'screen'}>
			{Object.entries({
				...(isLoadApp ? splashScreen : authScreen),
			}).map(([name, component]) => (
				<Stack.Screen
					key={name}
					name={name}
					component={component.screen}
					options={{
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						...component.options,
					}}
				></Stack.Screen>
			))}
		</Stack.Navigator>
	);
};

export const rootStack = () => {
	return (
		<Stack.Navigator headerMode={'screen'}>
			{Object.entries({
				...(appScreen),
			}).map(([name, component]) => (
				<Stack.Screen
					key={name}
					name={name}
					component={component.screen}
					options={{
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						...component.options,
					}}
				></Stack.Screen>
			))}
		</Stack.Navigator>
	);
};
