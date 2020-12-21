import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { url } from '../../../constants';

const ListReview = ({ idUser, listReview, getReview }) => {
	const handleDelete = async (id) => {
		const token = await AsyncStorage.getItem('token');
		Axios.delete(`${url}/reviews/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				getReview();
			})
			.catch();
	};

	return (
		<View style={styles.container}>
			{listReview.map((item, key) => (
				<View
					style={{
						backgroundColor: 'white',
						marginVertical: 10,
						borderRadius: 5,
						padding: 10,
					}}
					key={key}
				>
					<View style={styles.inforUser}>
						<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
							{item.user?.name}
						</Text>
						<Text>9h30 17/12/2020</Text>
					</View>
					<View style={{ paddingTop: 10 }}>
						<Text>{item.content}</Text>
					</View>
					{item.user?.id === idUser ? (
						<View style={styles.btn}>
							<TouchableOpacity style={styles.paddingBtn}>
								<Text>Sửa</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleDelete(item.id)}>
								<Text>Xóa</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View></View>
					)}
				</View>
			))}
		</View>
	);
};

export default ListReview;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inforUser: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btn: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	paddingBtn: {
		paddingHorizontal: 10,
	},
});
