import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { _navigation } from '../../constants';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
const updateprofile = ({ navigation }) => {
	const [image, setImage] = useState(
		'https://api.adorable.io/avatars/80/abott@adorable.png'
	);
  const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		id: '',
		fullname: '',
		username: '',
		phonenumber: '',
		email: '',
		city: 'Da Nang',
		date_ob: new Date(),
		date: '',
		check_textInputChange_fullname: false,
		check_textInputChange: false,
		check_textInputChange_phonenumber: false,
		check_textInputChange_email: false,
		isValidFullName: true,
		isValidUser: true,
		isValidPhoneNumber: true,
		isValidCity: true,
		isValidEmail: true,
		mode: 'date',
		show: false,
	});

	const loadData = async () => {
    setLoading(true);
		const [token, username] = await Promise.all([
			AsyncStorage.getItem('token'),
			AsyncStorage.getItem('username'),
		]);
		fetch('http://evening-wildwood-46158.herokuapp.com/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
        setLoading(false);
				if (responseJson.id && responseJson.dayOfBirth) {
					setData({
						...data,
						fullname: responseJson.name,
						username: responseJson.username,
						email: responseJson.email,
						id: responseJson.id,
						city: responseJson.address,
						phonenumber: responseJson.phone,
						role: responseJson.role,
						date_ob: new Date(responseJson.dayOfBirth),
					});
				} else if (responseJson.id) {
					setData({
						...data,
						fullname: responseJson.name,
						username: responseJson.username,
						email: responseJson.email,
						id: responseJson.id,
						city: responseJson.address,
						phonenumber: responseJson.phone,
						role: responseJson.role,
					});
				}
			});
	};
	useEffect(() => {
		loadData();
	}, []);

	const handleSubmit = () => {
    setLoading(true);
		if (
			data.isValidFullName &&
			data.isValidUser &&
			data.isValidEmail &&
			data.isValidPhoneNumber &&
			data.isValidCity
		) {
      handleUpdate();
      setLoading(false);
			alert('Update thanh cong');
			navigation.navigate(_navigation.Profile, { isFromUpdatedProfile: true });
		} else {
      setLoading(false);
			alert('All data is not validated');
		}
	};

	const handleUpdate = async () => {
		const token = await AsyncStorage.getItem('token');
		fetch('https://evening-wildwood-46158.herokuapp.com/update/' + data.id, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			method: 'PUT',
			body: JSON.stringify({
				name: data.fullname,
				phone: data.phonenumber,
				email: data.email,
				address: data.city,
				dayOfBirth: data.date_ob,
			}),
		});
	};
	const handleCityChange = (itemValue) => {
		setData({
			...data,
			city: itemValue,
		});
	};
	const textInputChange_fullname = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				fullname: val,
				check_textInputChange_fullname: true,
				isValidFullName: true,
			});
		} else {
			setData({
				...data,
				fullname: val,
				check_textInputChange_fullname: false,
				isValidFullName: false,
			});
		}
	};
	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				username: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				username: val,
				check_textInputChange: false,
				isValidUser: false,
			});
		}
	};
	const handlePhoneNumberChange = (val) => {
		if (val.trim().length === 10) {
			setData({
				...data,
				phonenumber: val,
				check_textInputChange_phonenumber: true,
				isValidPhoneNumber: true,
			});
		} else {
			setData({
				...data,
				phonenumber: val,
				check_textInputChange_phonenumber: false,
				isValidPhoneNumber: false,
			});
		}
	};
	const handleEmailChange = (val) => {
		const emailRegex = /\S+@\S+\.\S+/;
		if (emailRegex.test(val)) {
			setData({
				...data,
				email: val,
				check_textInputChange_email: true,
				isValidEmail: true,
			});
		} else {
			setData({
				...data,
				email: val,
				check_textInputChange_email: false,
				isValidEmail: false,
			});
		}
	};
	return (
		<ScrollView style={styles.container}>
			<Spinner
				visible={loading}
				textContent={'Loading'}
				textStyle={{ color: 'white' }}
			/>
			<View style={{ margin: 20 }}>
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity>
						<View
							style={{
								height: 100,
								width: 100,
								borderRadius: 15,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ImageBackground
								source={{
									uri: image,
								}}
								style={{ height: 100, width: 100 }}
								imageStyle={{ borderRadius: 15 }}
							>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Icon
										name="camera"
										size={35}
										color="#fff"
										style={{
											opacity: 0.7,
											alignItems: 'center',
											justifyContent: 'center',
											borderWidth: 1,
											borderColor: '#fff',
											borderRadius: 10,
										}}
									></Icon>
								</View>
							</ImageBackground>
						</View>
					</TouchableOpacity>
					<Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
						@{data.username}
					</Text>
				</View>
				<Text style={styles.text_footer}>Username</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" size={20}></FontAwesome>
					<TextInput
						placeholder="Username"
						editable={false}
						placeholderTextColor="#666666"
						style={styles.textInput}
						onChangeText={(val) => textInputChange(val)}
						autoCorrect={false}
					>
						{data.username}
					</TextInput>
					{data.check_textInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidUser ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Username must be 4 characters long.
						</Text>
					</Animatable.View>
				)}
				<Text style={styles.text_footer}>Fullname</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" size={20}></FontAwesome>
					<TextInput
						placeholder="Full name"
						placeholderTextColor="#666666"
						style={styles.textInput}
						onChangeText={(val) => textInputChange_fullname(val)}
						autoCorrect={false}
					>
						{data.fullname}
					</TextInput>
					{data.check_textInputChange_fullname ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidFullName ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Fullname must be 4 characters long.
						</Text>
					</Animatable.View>
				)}

				<Text style={styles.text_footer}>Phone number</Text>
				<View style={styles.action}>
					<Feather name="phone" size={20}></Feather>
					<TextInput
						placeholder="Phone number"
						keyboardType="number-pad"
						placeholderTextColor="#666666"
						style={styles.textInput}
						onChangeText={(val) => handlePhoneNumberChange(val)}
						autoCorrect={false}
					>
						{data.phonenumber}
					</TextInput>
					{data.check_textInputChange_phonenumber ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidPhoneNumber ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							phonenumber must be 10 numbers long.
						</Text>
					</Animatable.View>
				)}
				<Text style={styles.text_footer}>Email</Text>
				<View style={styles.action}>
					<FontAwesome name="envelope-o" size={20}></FontAwesome>
					<TextInput
						placeholder="Email"
						placeholderTextColor="#666666"
						keyboardType="email-address"
						style={styles.textInput}
						onChangeText={(val) => handleEmailChange(val)}
						autoCorrect={false}
					>
						{data.email}
					</TextInput>
					{data.check_textInputChange_email ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidEmail ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>Email is not validated.</Text>
					</Animatable.View>
				)}
				<Text style={styles.text_footer}>City</Text>
				<View style={styles.action}>
					<Icon name="map-marker-outline" size={20}></Icon>
					<Picker
						style={styles.pickerComponent}
						selectedValue={data.city}
						placeholder="Your address"
						onValueChange={(itemValue, itemIndex) => {
							handleCityChange(itemValue);
						}}
					>
						<Picker.Item label="Da Nang" value="Da Nang"></Picker.Item>
						<Picker.Item label="Sai Gon" value="Sai Gon"></Picker.Item>
						<Picker.Item label="Ha Noi" value="Ha Noi"></Picker.Item>
						<Picker.Item
							label="Thua Thien Hue"
							value="Thua Thien Hue"
						></Picker.Item>
						<Picker.Item label="Hoi An" value="Hoi An"></Picker.Item>
					</Picker>
				</View>
				<Text style={styles.text_footer}>Birthday</Text>
				<View style={styles.action}>
					<Icon name="calendar" size={20}></Icon>
					<DatePicker
						style={styles.pickerComponent}
						date={data.date_ob}
						mode="date"
						androidMode="spinner"
						showIcon={false}
						placeholder="select date"
						format="YYYY-MM-DD"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								marginLeft: 0,
							},
						}}
						onDateChange={(date) => {
							setData({
								...data,
								date_ob: date,
							});
						}}
					/>
				</View>
				<TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
					<Text style={styles.panelButtonTitle}>Submit</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};
export default updateprofile;
