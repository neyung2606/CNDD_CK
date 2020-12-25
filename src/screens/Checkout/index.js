import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	StatusBar,
	Alert,
} from 'react-native';
import { url, _navigation } from '../../constants';
import styles from './styles';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';

const Checkout = ({ navigation }) => {
	const [data, setData] = useState({
		id: '',
		name: '',
		phone: '',
		address: '',
		isValidFullName: true,
		isValidPhoneNumber: true,
		isValidAddress: true,
	});
	const [loading, setLoading] = useState(false);

	const authenticate = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token ) {
			loadProfile(token);
		} else {
			alert('Please log in to continue');
			navigation.navigate(_navigation.SignIn);
		}
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
				setLoading(false);
				setData({
					id: responseJson.id,
					name: responseJson.name,
					phone: responseJson.phone,
					address: responseJson.address,
				});
			});
	};

	useEffect(() => {
		authenticate();
	}, []);
	const handlePhoneNumberChange = (val) => {
		if (val.trim().length === 10) {
			setData({
				...data,
				phone: val,
				isValidPhoneNumber: true,
			});
		} else {
			setData({
				...data,
				phone: val,
				isValidPhoneNumber: false,
			});
		}
	};
	const textInputChange_fullname = (val) => {
		if (val.trim().length >= 1) {
			setData({
				...data,
				name: val,
				isValidFullName: true,
			});
		} else {
			setData({
				...data,
				name: val,
				isValidFullName: false,
			});
		}
	};
	const textInputChange_address = (val) => {
		if (val.trim().length >= 1) {
			setData({
				...data,
				address: val,
				isValidAddress: true,
			});
		} else {
			setData({
				...data,
				address: val,
				isValidAddress: false,
			});
		}
	};

	const _handleResquestOrder = async () => {
		const token = await AsyncStorage.getItem('token');
		const cart = JSON.parse(await AsyncStorage.getItem('cart'));
		const money = JSON.parse(await AsyncStorage.getItem('money'));
		const productOrder = cart.map((item) => {
			return {
				id_product: item.id_product,
				quantity: Number.parseInt(item.quantity),
			};
		});
		const order = {
			id_user: data.id,
			name: data.name,
			phone: data.phone,
			address: data.address,
			totalMoney: money,
			productOrder: productOrder,
		};
		if (
			order.name.trim().length >= 1 &&
			order.phone.trim().length === 10 &&
			order.address.trim().length >= 1
		) {
			axios
				.post(`${url}/orders/create`, order, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					console.log(res);
				})
				.catch(() => console.log('err'));

			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Thông báo',
				text2: 'Đặt hàng thành công',
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
				onShow: () => {},
				onHide: () => {},
				onPress: () => {},
			});
			navigation.navigate(_navigation.Home);
			await AsyncStorage.removeItem('cart');
			await AsyncStorage.removeItem('money');
		} else {
			alert(
				'Username & Address must not be empty & Phone number must be 10 digits'
			);
			console.log('Sai kia!!!');
		}
	};

	return (
		<View style={styles.A}>
			<Spinner visible={loading} textContent={"Loading"} textStyle={{ color: "white" }} />
			<StatusBar backgroundColor="gray" barStyle="light-content" />

			<ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
				<View style={styles.E} />

				<Text style={styles.F}>Full Name</Text>
				<View style={styles.G}>
					<TextInput
						value={data?.name}
						onChangeText={(val) => textInputChange_fullname(val)}
					/>
				</View>

				<Text style={styles.F}>Phone Number</Text>
				<View style={styles.G}>
					<TextInput
						value={data?.phone}
						keyboardType="number-pad"
						onChangeText={(val) => handlePhoneNumberChange(val)}
					/>
				</View>

				<Text style={styles.F}>Address</Text>
				<View style={styles.G}>
					<TextInput
						value={data?.address}
						style={styles.H}
						onChangeText={(val) => textInputChange_address(val)}
					/>
				</View>
				<View style={styles.K}>
					<TouchableOpacity
						style={styles.L}
						onPress={() => navigation.navigate('Cart')}
					>
						<Text style={styles.M}>Go back to Cart</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.N}
						onPress={() => {
							_handleResquestOrder();
						}}
					>
						<Text style={styles.O}>Order</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};
export default Checkout;
