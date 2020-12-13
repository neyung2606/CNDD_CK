import React, { useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView,
} from 'react-native';
import { _navigation } from '../../constants';
import categories from '../../mooks/categories.json';
import TopCategory from './TopCategory';
import Block from '../../components/body/Block';
import PopularItems from './PopularItems';
import Favorite from './Favorite';
import AllProducts from './AllProducts';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../stores';
const W = Dimensions.get('window').width / 4;

const Home = ({ navigation }) => {
	const { signOut } = useContext(AuthContext);

	return (
		<ScrollView style={{height: Dimensions.get('screen').height}}>
			<TopCategory></TopCategory>
			<Block height={1} color="#EFEEEE" />
			<PopularItems></PopularItems>
			<Block height={1} color="#EFEEEE" />
			{/* <Favorite></Favorite> */}
			<Block height={1} color="#EFEEEE" />
			<AllProducts navigation={navigation}></AllProducts>
		</ScrollView>
	);
};

const style = StyleSheet.create({
	img: {
		width: W,
		height: (W * 9) / 16,
		borderRadius: 8,
	},
});
export default Home;
