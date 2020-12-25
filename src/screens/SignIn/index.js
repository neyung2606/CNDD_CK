import React, { useContext, useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StatusBar,
	Alert,
	StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { _navigation } from '../../constants';
import styles from './styles';
import { AuthContext } from '../../stores';
import Spinner from 'react-native-loading-spinner-overlay';

const SignIn = ({ navigation }) => {
	const [data, setData] = useState({
		username: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
		token: '',
		isToken: false,
		tokenLogInFromAPI: '',
	});
	const [loading, setLoading] = useState(false);

	const { signIn } = useContext(AuthContext);

	const sendCred = async () => {
		setLoading(true);
		fetch('http://evening-wildwood-46158.herokuapp.com/auth/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		})
			.then((response) => response.json())
			.then(async (responseJson) => {
				if (responseJson.token !== '' && responseJson.statusCode !== 409) {
					setData({
						...data,
						tokenLogInFromAPI: responseJson.token,
						isToken: true,
					});
					await AsyncStorage.setItem('token', responseJson.token);
					const tk = await AsyncStorage.getItem('token');
					setLoading(false);
					signIn(tk);
				} else if (responseJson.statusCode === 409) {
					setLoading(false);
					alert('Vui long kiem tra lai user name pass');
				}
			});
	};
	const detectLogin = async () => {
		setData({
			...data,
			token: await AsyncStorage.getItem('token'),
		});
		const tk = await AsyncStorage.getItem('token');
		if (tk !== null) {
			setData({
				...data,
				isToken: true,
			});
		} else {
			setData({
				...data,
				isToken: false,
			});
		}
	};
	useEffect(() => {
		detectLogin();
	}, []);
	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				username: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				username: val,
				check_textInputChange: false,
				isValidUser: false,
			});
		}
	};

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 8) {
			setData({
				...data,
				password: val,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const handleValidUser = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
			});
		}
	};
	return (
		<View style={styles.container}>
			<Spinner
				visible={loading}
				textContent={'Loading'}
				textStyle={{ color: 'white' }}
			/>
			<StatusBar backgroundColor="#0066FF" barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>
			<Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
				<Text style={[styles.text_footer]}>Username</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" size={20} />
					<TextInput
						placeholder="Your Username"
						placeholderTextColor="#666666"
						style={[styles.textInput]}
						autoCapitalize="none"
						onChangeText={(val) => {
							textInputChange(val);
						}}
						onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
					></TextInput>
					{data.check_textInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidUser ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Username must be 4 characters long.
						</Text>
					</Animatable.View>
				)}
				<Text
					style={[
						styles.text_footer,
						{
							marginTop: 35,
						},
					]}
				>
					Password
				</Text>
				<View style={styles.action}>
					<Feather name="lock" size={20} />
					<TextInput
						placeholder="Your Password"
						placeholderTextColor="#666666"
						secureTextEntry={data.secureTextEntry ? true : false}
						style={[styles.textInput]}
						autoCapitalize="none"
						onChangeText={(val) => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{data.secureTextEntry ? (
							<Feather name="eye-off" color="grey" size={20} />
						) : (
							<Feather name="eye" color="grey" size={20} />
						)}
					</TouchableOpacity>
				</View>
				{data.isValidPassword ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}
				<View style={styles.button}>
					<TouchableOpacity style={styles.signIn} onPress={() => sendCred()}>
						<LinearGradient
							colors={['#0066FF', '#0066FF']}
							style={styles.signIn}
						>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Sign In
							</Text>
						</LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate(_navigation.SignUp)}
						style={[
							styles.signIn,
							{
								borderColor: '#0066FF',
								borderWidth: 1,
								marginTop: 15,
							},
						]}
					>
						<Text
							style={[
								styles.textSign,
								{
									color: '#0066FF',
								},
							]}
						>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};
export default SignIn;
