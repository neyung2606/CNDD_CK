import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { Header, Card, Image, Text, Input } from 'react-native-elements';
import { _navigation } from '../../constants';
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';

const numberOfColumns = 2;
const Search = ({ navigation }) => {
	const [data, setData] = useState({
		products: [],
		showedProducts: [],
		input: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		handleGetProducts();
	}, []);
	const handleGetProducts = () => {
		setLoading(true);
		fetch('https://evening-wildwood-46158.herokuapp.com/products', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setData({
					...data,
					products: data,
					showedProducts: data,
				});
				setLoading(false);
			});
	};
	const handleSearch = (value) => {
		product = data.products;
		newShow = product.filter((product) => product.name.includes(value));
		setData({
			...data,
			showedProducts: newShow,
		});
	};
	const _renderItem = ({ item }) => {
		return (
			<Swiper
				style={styles.container}
				showsPagination={false}
				height={300}
				loop={false}
			>
				<Card containerStyle={styles.cardContainer}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(_navigation.Detail, { id: item.id })
						}
					>
						<Image
							style={styles.image}
							source={{ uri: item.image[0] }}
							PlaceholderContent={
								<View
									style={{
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<ActivityIndicator
										size="large"
										color="red"
									></ActivityIndicator>
								</View>
							}
						/>
						<Text style={styles.textDetail} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.textDetail} numberOfLines={1}>
							{item.price}
						</Text>
					</TouchableOpacity>
				</Card>
				<Card containerStyle={styles.cardContainer}>
					<TouchableOpacity
					// onPress={() => navigation.navigate('Detail', { data: item })}
					>
						<Text style={styles.textDetailTitle} numberOfLines={1}>
							Id
						</Text>
						<Text style={styles.textDetailInfor} numberOfLines={1}>
							{item.id}
						</Text>
						<Text style={styles.textDetailTitle} numberOfLines={1}>
							Name
						</Text>
						<Text style={styles.textDetailInfor} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.textDetailTitle} numberOfLines={1}>
							Price
						</Text>
						<Text style={styles.textDetailInfor} numberOfLines={1}>
							{item.price}
						</Text>
						<Text style={styles.textDetailTitle} numberOfLines={1}>
							Description
						</Text>
						<Text style={styles.textDetailInfor} numberOfLines={1}>
							{item.description}
						</Text>
						<Text style={styles.textDetailTitle} numberOfLines={1}>
							Quantity
						</Text>
						<Text style={styles.textDetailInfor} numberOfLines={1}>
							{item.quantity}
						</Text>
					</TouchableOpacity>
				</Card>
			</Swiper>
		);
	};
	const showData = data.showedProducts;
	return (
		<View>
			<Spinner
				visible={loading}
				textContent={'Loading'}
				textStyle={{ color: 'white' }}
			/>
			<Input
				placeholder="Search"
				style={styles.searchContainer}
				onChangeText={(val) => {
					handleSearch(val);
				}}
			/>
			<FlatList
				data={showData}
				renderItem={_renderItem}
				horizontal={false}
				numColumns={numberOfColumns}
			/>
		</View>
	);
};
export default Search;
