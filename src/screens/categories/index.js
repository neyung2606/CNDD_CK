import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	Image,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { url, _navigation } from '../../constants';
import { styles } from './styles';

const Category = ({ navigation, route }) => {
	const [data, setData] = useState([]);
	const name = route.params.name;

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const token = await AsyncStorage.getItem('token');
		Axios.get(`${url}/categories?name=${name}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setData(res.data[0].product);
			})
			.catch(() => console.log('err'));
	};

	const renderProduct = ({ item }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate(_navigation.Detail, { id: item.id })}
		>
			<View style={styles.container}>
				{item.image && (
					<Image style={styles.photo} source={{ uri: item?.image[0] }} />
				)}
				<Text style={styles.title}>{item.name}</Text>
				<Text style={styles.price}>{item.price}{' '}Đ</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				horizontal={false}
				data={data}
				renderItem={renderProduct}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
		</SafeAreaView>
	);
};

export default Category;
