import { StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get('window')
export default StyleSheet.create({
  A: {
    flex: 1,
    backgroundColor: 'white',
  },
  B: {
    backgroundColor:'#FF6347',
    alignItems:'center',
  },
  C: {
    height:10,
  },
  D: {
    fontSize:32,
    fontWeight:'bold',
    color:'black',
  },
  E: {
    height:100,
  },
  F: {
    fontSize: 20,
    fontWeight:'bold',
    marginTop:10,
  },
  G: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor:'silver',
    paddingBottom: 5,
  },
  H: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  I: {
    color: '#FF0000',
    fontSize: 14,
  },
  J: {
    height: 50, 
    width: 150,
  },
  K: {
    alignItems: 'center',
    marginTop: 15,
  },
  L: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  M: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '200',
  },
  N: {
    backgroundColor:'#FF6347',
    width:width-40,
    alignItems:'center',
    padding:10,
    borderRadius:5,
    margin:20,
  },
  O: {
    fontSize:24,
    fontWeight:'bold',
    color:'white',
  },
});
