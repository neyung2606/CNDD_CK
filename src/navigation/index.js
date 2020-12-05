import React, { useEffect, useMemo, useReducer, useState } from 'react';
// xài drawer thì bật
import 'react-native-gesture-handler';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { authStack, rootStack } from './App';
import { _navigation } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../stores';
const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const CustomDrawerContent = (props) => {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props}>
				<DrawerItem
					label="List Food"
					onPress={() => props.navigation.navigate(_navigation.Home)}
				/>
			</DrawerItemList>
		</DrawerContentScrollView>
	);
};

const AppContainer = () => {
	const initialLoginState = {
		token: '',
	};

	const loginReducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN': {
				return {
					token: action.payload,
				};
			}
			case 'LOGOUT': {
				return {
					token: null,
				};
			}
			default:
				return state;
		}
	};

	const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

	const authContext = useMemo(
		() => ({
			signIn: (token) => {
				console.log(token);
				dispatch({ type: 'LOGIN', payload: token });
			},
			signOut: () => {
				dispatch({ type: 'LOGOUT' });
			},
		}),
		[]
	);

	useEffect(() => {
		getToken();
		
		return () => {};
	}, []);

	const getToken = async () => {
		const token = await AsyncStorage.getItem('token');
		token
			? dispatch({ type: 'LOGIN', payload: token })
			: dispatch({ type: 'LOGOUT' });
	};

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{loginState.token ? (
					<Drawer.Navigator
						drawerContent={(props) => <CustomDrawerContent {...props} />}
					>
						<Drawer.Screen name="Home" component={rootStack} />
					</Drawer.Navigator>
				) : (
					<AuthStack.Navigator screenOptions={{ header: () => {} }}>
						<AuthStack.Screen name="Auth" component={authStack} />
					</AuthStack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default AppContainer;
