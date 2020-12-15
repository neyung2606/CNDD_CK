import { StyleSheet } from "react-native";
import { HEIGHT_SCREEN, HEIGHT_WIN, WIDTH_SCREEN, WIDTH_WIN } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN * 0.3
  },
  infor: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#c41111',
    padding: 10,
    borderRadius: 50
  },
  content: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN * 0.6,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    height: HEIGHT_WIN * 0.08,
    borderColor: "black",
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    padding: 10,
    flexDirection: 'row'
  },
  imgModal: {
    width: WIDTH_SCREEN * 0.2,
    height: HEIGHT_SCREEN * 0.1,
    marginRight: 10
  },
  quantity: {
    width: WIDTH_SCREEN * 0.1,
    textAlign: 'center'
  },
  footer: {
    width: WIDTH_SCREEN,
    height: WIDTH_SCREEN * 0.15,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  }
})