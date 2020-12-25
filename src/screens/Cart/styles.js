import { StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get('window');
export default StyleSheet.create({
	A: {
		flex: 1,
	},
	B: {
		backgroundColor: '#0066FF',
		alignItems: 'center',
	},
	C: {
		height: 10,
	},
	D: {
		fontSize: 32,
		fontWeight: 'bold',
		color: 'black',
	},
	E: {
		width: width - 20,
		margin: 10,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		borderBottomWidth: 2,
		borderColor: 'silver',
		paddingBottom: 10,
	},
	F: {
		width: width / 3,
		height: width / 3,
	},
	G: {
		flex: 1,
		backgroundColor: 'transparent',
		padding: 10,
		justifyContent: 'space-between',
	},
	H: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	I: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	J: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	K: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30, 
    height: 30,
		backgroundColor: 'white',
		borderRadius: 100,
	},
	L: {
		fontWeight: 'bold',
		fontSize: 10,
    color: 'black',
	},
	M: {
		fontWeight: 'bold',
		color: 'black',
    fontSize: 20,
	},
	N: {
		backgroundColor: '#0066FF',
		padding: 8,
		borderRadius: 1000,
	},
	O: {
		paddingHorizontal: 8,
		fontWeight: 'bold',
		fontSize: 18,
	},
	P: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	Q: {
		fontWeight: 'bold',
		color: '#33c37d',
		fontSize: 20,
	},
	R: {
		backgroundColor: '#0066FF',
		width: width - 40,
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
		margin: 20,
	},
	S: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
