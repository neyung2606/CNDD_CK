import React, { useEffect, useContext, useState, memo } from 'react';
import { View, SafeAreaView } from 'react-native';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { _navigation } from '../../constants';
import { AuthContext } from '../../stores';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';

const Profile = ({ navigation, route }) => {
	const { signOut } = useContext(AuthContext);
	const [data, setData] = useState({
		username: '',
		fullname: '',
		phonenumber: '',
		email: '',
		role: '',
		id: '',
		city: '',
		token: '',
		isToken: false,
	});
	const [loading, setLoading] = useState(false);

	const authenticate = async () => {
		const token = await AsyncStorage.getItem('token');
		loadProfile(token);
	};
	const loadProfile = async (token) => {
		setLoading(true);
		fetch('http://evening-wildwood-46158.herokuapp.com/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson && responseJson.id) {
					setData({
						...data,
						fullname: responseJson.name,
						username: responseJson.username,
						email: responseJson.email,
						id: responseJson.id,
						city: responseJson.address,
						phonenumber: responseJson.phone,
						role: responseJson.role.name,
					});
					setLoading(false);
				}
			});
	};
	useEffect(() => {
		authenticate();
	}, [route]);
	return (
		<SafeAreaView style={styles.container}>
			<Spinner
				visible={loading}
				textContent={'Loading'}
				textStyle={{ color: 'white' }}
			/>
			<View style={styles.userInfoSection}>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Avatar.Image
						source={{
							uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
						}}
						size={80}
					></Avatar.Image>
					<View style={{ marginLeft: 20 }}>
						<Title style={(styles.title, { marginTop: 15, marginBottom: 5 })}>
							{data.fullname}
						</Title>
						<Caption style={styles.caption}>@{data.username}</Caption>
					</View>
				</View>
			</View>
			<View style={styles.userInfoSection}>
				<View style={styles.row}>
					<Icon name="map-marker-radius" color="#777777" size={20}></Icon>
					<Text style={{ color: '#777777', marginLeft: 20 }}>{data.city}</Text>
				</View>
				<View style={styles.row}>
					<Icon name="phone" color="#777777" size={20}></Icon>
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						{data.phonenumber}
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name="email" color="#777777" size={20}></Icon>
					<Text style={{ color: '#777777', marginLeft: 20 }}>{data.email}</Text>
				</View>
			</View>

			<View style={styles.infoBoxWrapper}>
				<View
					style={[
						styles.infoBox,
						{ borderRightColor: '#dddddd', borderRightWidth: 2 },
					]}
				>
					<Title>{data.role}</Title>
					<Caption>Role</Caption>
				</View>
				<View style={styles.infoBox}>
					<Title>25</Title>
					<Caption>Vouchers</Caption>
				</View>
			</View>

			<View style={styles.menuWrapper}>
				<TouchableRipple
					onPress={() => {
						navigation.navigate(_navigation.Cart);
					}}
				>
					<View style={styles.menuItem}>
						<Icon name="cart" size={25} color="#0066FF" />
						<Text style={styles.menuItemText}>History Order</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						navigation.navigate(_navigation.UpdateProfile);
					}}
				>
					<View style={styles.menuItem}>
						<Icon name="account-edit" color="#0066FF" size={25}></Icon>
						<Text style={styles.menuItemText}>Edit your profile</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						navigation.navigate(_navigation.ChangePassword);
					}}
				>
					<View style={styles.menuItem}>
						<Icon name="lock-outline" color="#0066FF" size={25}></Icon>
						<Text style={styles.menuItemText}>Change password</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						alert('You chose Support');
					}}
				>
					<View style={styles.menuItem}>
						<Icon name="account-check-outline" color="#0066FF" size={25}></Icon>
						<Text style={styles.menuItemText}>Support</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => signOut()}>
					<View style={styles.menuItem}>
						<Icon name="exit-to-app" color="#0066FF" size={25}></Icon>
						<Text style={styles.menuItemText}>Log out</Text>
					</View>
				</TouchableRipple>
			</View>
		</SafeAreaView>
	);
};

export default memo(Profile);
