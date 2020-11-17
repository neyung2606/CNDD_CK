import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
import {_navigation} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';

const ChangePassword = ({navigation}) => {
  const [data, setData] = React.useState({
    id: '',
    oldpass: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidCurrentPassword: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });
  const loadData = async () => {
    const token = await AsyncStorage.getItem('token');

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
            id: responseJson.id,
          });
        }
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleCurrentPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        oldpass: val,
        isValidCurrentPassword: true,
      });
    } else {
      setData({
        ...data,
        oldpass: val,
        isValidCurrentPassword: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8 && val === data.password) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };
  const handleConfirmButton = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('https://evening-wildwood-46158.herokuapp.com/update/' + data.id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        checkPassword: data.oldpass,
        newPassword: data.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === 404) {
          alert('Old password wrong, please try again');
        } else {
          alert('Change pass thanh cong');
          navigation.navigate(_navigation.Profile);
        }
      });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            CHANGE YOUR PASSWORD
          </Text>
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 20,
            },
          ]}>
          Current Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Current Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleCurrentPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidCurrentPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Length >= 8 please</Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 10,
            },
          ]}>
          New Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your New Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 10,
            },
          ]}>
          Confirm New Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Confirm Your New Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Confirm new password must be the same as new password
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            console.log(data.oldpass, data.password, data.confirm_password);
            if (
              data.isValidCurrentPassword &&
              data.isValidPassword &&
              data.isValidConfirmPassword &&
              data.oldpass !== '' &&
              data.password !== '' &&
              data.confirm_password !== ''
            ) {
              handleConfirmButton();
            } else {
              alert('All data is not validated');
            }
          }}>
          <Text style={styles.panelButtonTitle}>Confirm Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChangePassword;
