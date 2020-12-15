import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { _navigation } from '../../constants';
import styles from './styles';

const Cart = ({ navigation }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		_retrieveData();

		return () => setData([]);
	}, []);

	const _retrieveData = useCallback(async () => {
		try {
			const value = await AsyncStorage.getItem('cart');
			if (value !== null) {
				const cartfood = JSON.parse(value);
				setData(cartfood);
			}
		} catch (error) {
			// Error retrieving data
		}
	}, []);

	const _Delete = async (i) => {
		try {
			data.splice(i, 1);
			await AsyncStorage.setItem('cart', JSON.stringify(data));
			_retrieveData()
		} catch (error) {
			// Error deleting data
		}
	};

	const _ChangeQual = async (i, type) => {
		try {
			let cantd = Number.parseInt(data[i].quantity);
			if (type) {
				cantd = cantd + 1;
				data[i].quantity = cantd;
				await AsyncStorage.setItem('cart', JSON.stringify(data));
			} else if (type == false && cantd >= 2) {
				cantd = cantd - 1;
				data[i].quantity = cantd;
				await AsyncStorage.setItem('cart', JSON.stringify(data));
			}
			_retrieveData()
		} catch (error) {
			// Error editing data
		}
	};

	function LoadTotal() {
		var total = 0;
		const cart = data;
		for (var i = 0; i < cart.length; i++) {
			total = total + cart[i].price * cart[i].quantity;
		}
		return total;
	}

	const _checkOut = async () => {
		try {
			const check = await AsyncStorage.getItem('cart');
			const money = await LoadTotal()
			if (check !== null && check.length !== 2) {
				await AsyncStorage.setItem('money', JSON.stringify(money))
				navigation.navigate(_navigation.Checkout);
			} else {
				alert('Your cart is empty!');
			}
		} catch (error) {
			// Error checkout data
		}
	};

	return (
		<View style={styles.A}>
			<View style={styles.A}>
				<ScrollView>
					{data.map((item, i) => {
						return (
							<View style={styles.E} key={i}>
								<Image
									resizeMode={'contain'}
									style={styles.F}
									source={{ uri: item?.image[0] }}
								/>
								<View style={styles.G}>
									<View style={styles.H}>
										<Text style={styles.I}>{item?.name}</Text>
										<View style={styles.J}>
											<TouchableOpacity
												style={styles.K}
												onPress={() => _Delete(i)}
											>
												<Text style={styles.L}>X</Text>
											</TouchableOpacity>
										</View>
									</View>
									<View>
										<Text>{item.food?.description}</Text>
									</View>
									<View style={styles.H}>
										<Text style={styles.M}>$ {item.price * item.quantity}</Text>
										<View style={styles.J}>
											<TouchableOpacity
												style={styles.N}
												onPress={() => _ChangeQual(i, false)}
											>
												<Text>-</Text>
											</TouchableOpacity>
											<Text style={styles.O}>{item.quantity}</Text>
											<TouchableOpacity
												style={styles.N}
												onPress={() => _ChangeQual(i, true)}
											>
												<Text>+</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						);
					})}
					<View style={styles.C} />
					<View style={styles.P}>
						<Text style={styles.O}>Total</Text>
						<View style={styles.J}>
							<Text style={styles.Q}>$ {LoadTotal()}</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.R} onPress={() => _checkOut()}>
						<Text style={styles.S}>CHECKOUT</Text>
					</TouchableOpacity>
					<View style={styles.C} />
				</ScrollView>
			</View>
		</View>
	);
};

export default memo(Cart);
