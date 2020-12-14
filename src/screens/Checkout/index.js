import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Picker,
} from 'react-native';
import {_navigation} from '../../constants';
import styles from './styles';

const Checkout = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    phonenumber: '',
    address: '',
    isValidAddress: true,
  });
  const [selectedValue, setSelectedValue] = useState("ON");

  const authenticate = async () => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    if (token && username) {
      loadProfile(username, token);
    } else {
      alert('Please log in to continue');
      navigation.navigate(_navigation.SignIn);
    }
  };

  const loadProfile = async (username, token) => {
    fetch('http://evening-wildwood-46158.herokuapp.com/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.id) {
          setData({
            ...data,
            username: responseJson.username,
            phonenumber: responseJson.phone,
          });
        }
      });
  };

  useEffect(() => {
    authenticate();
  }, []);

  const handleAddressChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        address: val,
        isValidAddress: true,
      });
    } else {
      setData({
        ...data,
        address: val,
        isValidAddress: false,
      });
    }
  };

  return (
    <View style={styles.A}>
      <StatusBar backgroundColor="gray" barStyle="light-content" />
      <View style={styles.B}>
        <View style={styles.C} />
        <Text style={styles.D}>Check Out</Text>
        <View style={styles.C} />
      </View>
      
        <ScrollView>
          <View style={styles.E} />

          <Text style={styles.F}>User</Text>
          <View style={styles.G}>
            <Text>  {data.username}</Text>
          </View>

          <Text style={styles.F}>Phone Number</Text>
          <View style={styles.G}>
            <Text>  {data.phonenumber}</Text>
          </View>

          <Text style={styles.F}>Address</Text>
          <View style={styles.G}>

            <TextInput
              placeholder="e.g:193 Nguyen Luong Bang"
              style={styles.H}
              onChangeText={(val) => handleAddressChange(val)}
            />

          </View>
          {data.isValidAddress ? null : (    
              <Text style={styles.I}>
                Address must be 6 characters long.
              </Text>
          )}

          <Text style={styles.F}>Payment Method</Text>
          <View style={styles.G}>
            <View>
              <Picker
                selectedValue={selectedValue}
                style={styles.J}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                  <Picker.Item label="Online" value="ON" />
                  <Picker.Item label="Offline" value="OFF" />
              </Picker>
            </View>
          </View>

          <View style={styles.K}>
            <TouchableOpacity
              style={styles.L}
              onPress={() => navigation.navigate('Cart')}>
                <Text style={styles.M}>
                  Go back to Cart
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.N} 
              onPress={() => {
                if (
                  data.address.length === 0 ||
                  data.isValidAddress === false 
                ) {
                  alert('Info is not valid');
                } else {
                  alert('Send to database')
                }
              }}>
                <Text style={styles.O}>
                  Order
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      
    </View>
  );
};
export default Checkout;
