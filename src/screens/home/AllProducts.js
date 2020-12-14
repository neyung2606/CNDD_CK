import React, { useEffect } from 'react';

import {
	FlatList,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import Block from '../../components/body/Block';
import TextView from '../../components/body/TextView';
import ButtonMain from '../../components/body/ButtonMain';
import HeaderTop from './HeaderTop';
import { _navigation } from '../../constants';

const W = Dimensions.get('window').width / 4;
const style = StyleSheet.create({
	img: {
		width: W,
		height: W,
		borderRadius: 8,
	},
});
const AllProducts = ({ navigation }) => {
	const [data, setData] = React.useState({
		products: [],
		input: '',
	});
	useEffect(() => {
		handleGetProducts();
	}, []);
	const handleGetProducts = () => {
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
				});
			});
	};
	const renderItem = ({ item }) => {
		return (
			<ButtonMain
				margin={5}
				borderRadius={8}
				shadow
				padding={10}
				color={'#fff'}
				onPress={() => navigation.navigate(_navigation.Detail, { id: item.id })}
			>
				<Block direction="row">
					<Image style={style.img} source={{ uri: item.image[0] }} />
					<Block paddingHorizontal={8}>
						<Block block>
							<TextView size={16}>{item.name}</TextView>
							<TextView color="#AAAAAA"> {item.description}</TextView>
						</Block>
						<TextView size={16}>{item.price}</TextView>
					</Block>
				</Block>
			</ButtonMain>
		);
	};
	const showData = data.products;
	return (
		<Block padding={10}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate(_navigation.Search);
				}}
			>
				<HeaderTop title="All Products" moreTitle="See all" />
			</TouchableOpacity>
			<FlatList horizontal data={showData} renderItem={renderItem} />
		</Block>
	);
};

export default AllProducts;
