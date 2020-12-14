import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Header, Card, Image, Text, Input} from 'react-native-elements';
import {_navigation} from '../../constants';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
var { width } = Dimensions.get('window');

const Detail = ({navigation}) => {
  const [data, setData] = React.useState({
    products: [],
    showedProducts: [],
    input: '',
  });

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = () => {
    fetch('https://evening-wildwood-46158.herokuapp.com/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData({
          ...data,
          showedProducts: data,
        });
      });
  };

  const onClickAddCart = (data) => {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price
    }
    AsyncStorage.getItem('car').then((datacart)=>{
        if (datacart !== null) {
          const cart = JSON.parse(datacart)
          cart.push(itemcart)
          AsyncStorage.setItem('car',JSON.stringify(cart));
        }
        else {
          const cart = []
          cart.push(itemcart)
          AsyncStorage.setItem('car',JSON.stringify(cart));
        }
        alert('Add Cart')
    })
      .catch((err)=>{
        alert(err)
      })
  }

  const _renderItem = ({item, navigation}) => {
    return (
        <Swiper
        style={styles.container}
        showsPagination={false}
        height={300}
        loop={false}>
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity
          // onPress={() => navigation.navigate('Detail', { data: item })}
          >
            <Image
              style={styles.image}
              source={{uri: item.image[0]}}
              PlaceholderContent={
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    color="red"></ActivityIndicator>
                </View>
              }
            />
            <Text style={styles.textDetail} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.textDetail} numberOfLines={1}>
              $ {item.price}
            </Text>

            <TouchableOpacity
              onPress={()=> onClickAddCart(item)}
              style={styles.T}>  
              <Text style={styles.U}>Add Cart</Text>
              <View style={styles.V} />
            </TouchableOpacity>

          </TouchableOpacity>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity
          // onPress={() => navigation.navigate('Detail', { data: item })}
          >
            <Text style={styles.textDetailTitle} numberOfLines={1}>
              Id
            </Text>
            <Text style={styles.textDetailInfor} numberOfLines={1}>
              {item.id}
            </Text>
            <Text style={styles.textDetailTitle} numberOfLines={1}>
              Name
            </Text>
            <Text style={styles.textDetailInfor} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.textDetailTitle} numberOfLines={1}>
              Price
            </Text>
            <Text style={styles.textDetailInfor} numberOfLines={1}>
              {item.price}
            </Text>
            <Text style={styles.textDetailTitle} numberOfLines={1}>
              Description
            </Text>
            <Text style={styles.textDetailInfor} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={styles.textDetailTitle} numberOfLines={1}>
              Quantity
            </Text>
            <Text style={styles.textDetailInfor} numberOfLines={1}>
              {item.quantity}
            </Text>
          </TouchableOpacity>
        </Card>
      </Swiper>
    );
  };

  const showData = data.showedProducts;
  return (  
    <ScrollView>
      <View style={styles.W}>
        <View style={styles.X}>
          <Text style={styles.titleCatg}>Detail</Text>
          <FlatList
          data={showData}
          renderItem={_renderItem}
          horizontal={false}
          numColumns={2}
          />
          <TouchableOpacity style={styles.R} onPress={()=> navigation.navigate('Cart')}>
            <Text style={styles.S}>
              CART
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
};
    
export default Detail;
