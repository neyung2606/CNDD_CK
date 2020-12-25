import { StyleSheet } from 'react-native';
import { APPCOLOR } from '../../constants';

export const header = StyleSheet.create({
	container: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: APPCOLOR.MAIN,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	title: {
		color: 'white',
	},
	menu: {
		position: 'absolute',
		left: 10,
		top: 5,
		height: 35,
		width: 35,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#0066FF',
		// borderColor: 'white',
	},
});
