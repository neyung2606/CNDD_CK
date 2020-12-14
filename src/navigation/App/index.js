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
} from '@react-navigation/stack';
import { header } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const bottomStack = {
	Home: {
		screen: Home,
		options: {
			title: 'Home',
			tabBarIcon: () => <Icon name="home" size={30} />,
		},
	},
	Profile: {
		screen: Profile,
		options: {
			title: 'Profile',
			tabBarIcon: () => <Icon name="user" size={30} />,
		},
	},
	Search: {
		screen: Search,
		options: {
			title: 'Search',
			tabBarIcon: () => <Icon name="search" size={30} />,
		},
	},
};

const Tab = createBottomTabNavigator();

export const TabNavigation = () => (
	<Tab.Navigator>
		{Object.entries({
			...bottomStack,
		}).map(([name, component]) => (
			<Tab.Screen
				key={name}
				name={name}
				component={component.screen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					...component.options,
				}}
			></Tab.Screen>
		))}
	</Tab.Navigator>
);

const appScreen = {
	Home: {
		screen: TabNavigation,
		options: {
			title: 'Home',
			header: () => {},
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

export const AuthStack = () => {
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

export const RootStack = () => {
	return (
		<Stack.Navigator headerMode={'screen'}>
			{Object.entries({
				...appScreen,
			}).map(([name, component]) => {
				return (
					<Stack.Screen
						key={name}
						name={name}
						component={component.screen}
						options={{
							cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
							...component.options,
						}}
					></Stack.Screen>
				);
			})}
		</Stack.Navigator>
	);
};
