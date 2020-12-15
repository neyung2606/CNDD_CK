import React, { useEffect, useState } from 'react';
import { url } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles';
import {
	Image,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Modal,
	TouchableWithoutFeedback,
	ActivityIndicator,
	TextInput
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Detail = ({ route }) => {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState('1');
	const id = route.params.id;

	useEffect(() => {
		getProduct();

		setTimeout(() => {
			setLoading(true);
		}, 2000);
	}, []);

	const getProduct = async () => {
		const token = await AsyncStorage.getItem('token');
		axios
			.get(`${url}/products?id=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setProduct(res.data[0]);
			})
			.catch(() => console.log('err'));
	};

	const addQuantity = () => {
		let number = Number.parseInt(quantity);
		++number;
		setQuantity(`${number}`);
	};

	const subQuantity = () => {
		let number = Number.parseInt(quantity);
		--number;
		setQuantity(`${number}`);
	};

	const renderOutsideTouchable = (onTouch) => {
		const view = <View style={{ flex: 1, width: '100%' }}></View>;
		if (!onTouch) return view;

		return (
			<TouchableWithoutFeedback
				onPress={onTouch}
				style={{ flex: 1, width: '100%' }}
			>
				{view}
			</TouchableWithoutFeedback>
		);
	};

	const onChangeText = (text) => {
		if (text === '') {
			setQuantity('1');
			return;
		}
		let newText = '';
		let numbers = '0123456789';

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
			} else setQuantity(quantity);
		}
		setQuantity(newText);
	};

	const handleCart = async () => {
		const getCart = await AsyncStorage.getItem('cart');
		if (getCart !== '[]') {
			const cart = JSON.parse(getCart);
			const index = await cart.findIndex(
				(item) => item.id_product === product.id
			);
			if (index === -1) {
				const productAdd = [
					...cart,
					{
						id_product: product.id,
						price: product.price,
						quantity: quantity,
						image: product.image,
					},
				];
				await AsyncStorage.setItem('cart', JSON.stringify(productAdd));
			} else {
				cart &&
					(cart[index].quantity = `${
						Number.parseInt(cart[index].quantity) + Number.parseInt(quantity)
					}`);
				await AsyncStorage.setItem('cart', JSON.stringify(cart));
			}
		} else {
			await AsyncStorage.setItem(
				'cart',
				JSON.stringify([
					{
						id_product: product.id,
						price: product.price,
						quantity: quantity,
						image: product.image,
					},
				])
			);
		}

		setVisible(false);
		Toast.show({
			type: 'success',
			position: 'top',
			text1: 'Thông báo',
			text2: 'Đã thêm vào giỏ hàng',
			visibilityTime: 4000,
			autoHide: true,
			topOffset: 30,
			bottomOffset: 40,
			onShow: () => {},
			onHide: () => {},
			onPress: () => {},
		});
	};

	return loading ? (
		<ScrollView style={styles.container}>
			{product.image && (
				<Image style={styles.img} source={{ uri: `${product?.image[0]}` }} />
			)}
			<View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
				<Text style={{ fontSize: 24, marginBottom: 15 }}>{product?.name}</Text>
				<Text style={{ marginBottom: 15 }}>{product?.description}</Text>
				<View style={styles.infor}>
					<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
						{product?.price} VNĐ
					</Text>
					<IconButton
						icon="plus"
						color={Colors.white}
						size={30}
						style={{ backgroundColor: 'red' }}
						onPress={() => setVisible(true)}
					/>
				</View>
			</View>
			<Modal
				visible={visible}
				animationType="slide"
				onDismiss={() => setVisible(false)}
				transparent
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						backgroundColor: '#000000AA',
					}}
				>
					{renderOutsideTouchable(() => setVisible(false))}

					<View style={styles.content}>
						<View style={styles.header}>
							<View style={{ position: 'absolute', left: 0 }}>
								<IconButton
									icon="close"
									color={Colors.black}
									size={30}
									onPress={() => setVisible(false)}
								/>
							</View>
							<View>
								<Text style={{ fontSize: 18 }}>Thêm món mới</Text>
							</View>
						</View>

						<View style={styles.body}>
							{product.image && (
								<Image
									style={styles.imgModal}
									source={{ uri: `${product?.image[0]}` }}
								/>
							)}

							<View style={{ flex: 1 }}>
								<Text style={{ fontSize: 18, marginBottom: 5 }}>
									{product?.name}
								</Text>

								<Text style={{ marginBottom: 5 }}>{product?.description}</Text>

								<View style={styles.infor}>
									<Text style={{ fontWeight: 'bold' }}>
										{Number.parseInt(product?.price) *
											Number.parseInt(quantity)}{' '}
										VNĐ
									</Text>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IconButton
											icon="minus"
											color={Colors.white}
											disabled={quantity === '1' ? true : false}
											size={20}
											animated
											style={{ backgroundColor: 'red' }}
											onPress={() => subQuantity()}
										/>
										<KeyboardAvoidingView behavior="padding">
											<TextInput
												style={styles.quantity}
												value={quantity}
												onChangeText={(text) => onChangeText(text)}
											/>
										</KeyboardAvoidingView>
										<IconButton
											icon="plus"
											color={Colors.white}
											size={20}
											animated
											style={{ backgroundColor: 'red' }}
											onPress={() => addQuantity()}
										/>
									</View>
								</View>
							</View>
						</View>

						<View style={styles.footer}>
							<Text style={{ fontWeight: 'bold' }}>
								{Number.parseInt(product?.price) * Number.parseInt(quantity)}{' '}
								VNĐ
							</Text>
							<View>
								<TouchableOpacity
									style={{ backgroundColor: '#c41111', borderRadius: 10 }}
									onPress={() => handleCart()}
								>
									<Text style={{ color: 'white', padding: 10 }}>
										Thêm vào giỏ hàng
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</ScrollView>
	) : (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000000AA',
			}}
		>
			<ActivityIndicator size="large" color="#00ff00" />
		</View>
	);
};

export default Detail;
