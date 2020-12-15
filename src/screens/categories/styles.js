import { StyleSheet } from 'react-native';
import { WIDTH_WIN } from '../../constants';


const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: RECIPE_ITEM_MARGIN,
		marginTop: 20,
		width:
			(WIDTH_WIN - 3 * RECIPE_ITEM_MARGIN) /
			2,
		height: RECIPE_ITEM_HEIGHT + 75,
		borderColor: '#cccccc',
		borderWidth: 0.5,
		borderRadius: 15,
	},
	photo: {
		width:
			(WIDTH_WIN - 3 * RECIPE_ITEM_MARGIN) /
			2,
		height: RECIPE_ITEM_HEIGHT,
		borderRadius: 15,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		flex: 1,
		fontSize: 17,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#444444',
		marginTop: 3,
		marginRight: 5,
		marginLeft: 5,
	},
	price: {
		marginTop: 5,
		marginBottom: 5,
	},
});
