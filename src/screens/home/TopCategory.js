import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Dimensions,
	Image,
} from 'react-native';
import { _navigation } from '../../constants';
import categories from '../../mooks/categories.json';
import Block from '../../components/body/Block';
import HeaderTop from './HeaderTop';
import TextView from '../../components/body/TextView';
import ButtonMain from '../../components/body/ButtonMain';

const W = Dimensions.get('window').width / 4;

const TopCategory = () => {
	const renderItem = ({ item }) => {
		return (
			<ButtonMain padding={5}>
				<Image style={style.img} source={{ uri: item.image }} />
				<TextView padding={8} center>
					{item.name}
				</TextView>
			</ButtonMain>
		);
	};
	return (
		<Block padding={10}>
			<HeaderTop moreIcon="filter" title="Top Categories" moreTitle="Filter" />

			<View>
				<FlatList
					horizontal
					keyExtractor={(item) => item.id}
					data={categories}
					showsHorizontalScrollIndicator={false}
					renderItem={renderItem}
				/>
			</View>
		</Block>
	);
};

const style = StyleSheet.create({
	img: {
		width: W,
		height: (W * 9) / 16,
		borderRadius: 8,
	},
});
export default TopCategory;
