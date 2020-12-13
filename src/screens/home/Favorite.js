import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Block from '../../components/body/Block';
import TextView from '../../components/body/TextView';
import ButtonMain from '../../components/body/ButtonMain';
import HeaderTop from './HeaderTop';
import foodapp from '../../mooks/foodapp.json';
const W = Dimensions.get('window').width / 2;
const style = StyleSheet.create({
	img: {
		width: W,
		height: W / 2,
		borderRadius: 8,
	},
	div: {
		position: 'relative',
	},
	saleoff: {
		position: 'absolute',
		top: 4,
		right: 4,
	},
});

const Favorite = () => {
	const renderItem = ({ item }) => {
		return (
			<ButtonMain
				margin={5}
				borderRadius={8}
				shadow
				padding={10}
				color={'#fff'}
			>
				<Block style={style.div}>
					<Image style={style.img} source={{ uri: item.image }} />
					<Block paddingVertical={8}>
						<TextView size={16}>{item.name}</TextView>
						<TextView color="#AAAAAA">By {item.location}</TextView>

						<TextView size={16}>{item.price}</TextView>
					</Block>

					<Block style={style.saleoff}>
						<TextView color="#fff" bgColor="#FF6347">
							<Feather name="thumbs-up" size={15} />
							Favorite
						</TextView>
					</Block>
				</Block>
			</ButtonMain>
		);
	};
	return (
		<Block padding={10}>
			<HeaderTop title="Favorite" moreTitle="View all" />
			<FlatList horizontal data={foodapp} renderItem={renderItem} />
		</Block>
	);
};

export default Favorite;
