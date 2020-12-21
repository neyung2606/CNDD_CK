import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { url } from '../../../constants';
import ListReview from './ListReview';

export function AddComment({ productId }) {
	const [comment, setComment] = useState('');
	const [idUser, setIdUser] = useState();
	const [listReview, setListReview] = useState([]);

	useEffect(() => {
		getUser();
		getReview();
	}, []);

	const getUser = async () => {
		const token = await AsyncStorage.getItem('token');
		Axios.get(`${url}/me`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setIdUser(res.data.id);
			})
			.catch();
	};

	const getReview = async () => {
		const token = await AsyncStorage.getItem('token');
		Axios.get(`${url}/reviews?id=${productId}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setListReview(res.data);
			})
			.catch();
	};

	const sendComment = async () => {
		const token = await AsyncStorage.getItem('token');
		Axios.post(
			`${url}/reviews/create`,
			{
				content: comment,
				userID: idUser,
				productId: productId,
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
			.then((res) => {
				setComment('');
				getReview();
				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Thông báo',
					text2: 'Cảm ơn bạn đã góp ý',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
					onShow: () => {},
					onHide: () => {},
					onPress: () => {},
				});
			})
			.catch();
	};

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 20, borderTopWidth: 2 }}>
				<Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
					Bình luận
				</Text>
			</View>
			<View style={styles.comment}>
				<TextInput
					style={styles.input}
					placeholder={'Add Comment'}
					value={comment}
					onChangeText={setComment}
				/>
				<TouchableOpacity
					style={styles.sendButton}
					disabled={!comment}
					onPress={sendComment}
				>
					<Svg
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
					</Svg>
				</TouchableOpacity>
			</View>
			<ListReview
				productId={productId}
				idUser={idUser}
				listReview={listReview}
				getReview={getReview}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	comment: {
		flexDirection: 'row',
	},
	input: {
		flex: 1,
		backgroundColor: 'white',
		padding: 16,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	sendButton: {
		backgroundColor: 'red',
		width: 60,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
