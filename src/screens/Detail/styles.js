import {StyleSheet,Dimensions,} from 'react-native';
var { width } = Dimensions.get('window')
export default StyleSheet.create({
  container: {

  },
  textDetail: {
    marginTop: 10,
    fontSize: 20,
  },
  textDetailTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textDetailInfor: {
    marginTop: 5,
    fontSize: 14,
  },
  cardContainer: {
    width: 180,
    marginLeft: 12,
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
  },
  searchContainer: {
    marginTop: 20,
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
  R: {
    backgroundColor:'#FF6347',
    width:width-40,
    alignItems:'center',
    padding:10,
    borderRadius:5,
    margin:20,
  },
  S: {
    fontSize:24,
    fontWeight:'bold',
    color:'white',
  },
  T: {
    width:(width/2)-40,
    backgroundColor:'#FF6347',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    borderRadius:5,
    padding:4,
  },
  U: {
    fontSize:18, 
    color:"white", 
    fontWeight:"bold",
  },
  V: {
    width:10,
  },
  W: {
    flex: 1,
    backgroundColor:"#f2f2f2",
  },
  X: {
    width:width, 
    borderRadius:20, 
    paddingVertical:20, 
    backgroundColor:'white',
  },
});
