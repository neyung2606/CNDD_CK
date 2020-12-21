import React, { useEffect, useMemo, useReducer, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation, AuthStack, RootStack } from './App';
import { _navigation } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../stores';

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
				dispatch({ type: 'LOGIN', payload: token });
			},
			signOut: async () => {
				dispatch({ type: 'LOGOUT' });
				await AsyncStorage.clear();
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

	console.log(loginState);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{loginState.token ? (
					<>
						<RootStack />
					</>
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default AppContainer;
