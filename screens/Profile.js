import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../constants';
import {Dimensions} from 'react-native';
import { logout } from '../redux/auth/actions';
import ModalComponent from '../components/Modal';

export default function Profile({setModalVisible, modalVisible}) {
  
  const {displayName, email} = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const fields =
  <View style={styles.prfile}>
  <View style={styles.infoContainer}>
    <Text style={{color: COLORS.primary, ...FONTS.body3}}>
      Name : {displayName}
    </Text>
    <Text
      style={{
        color: COLORS.primary,
        ...FONTS.body3,
      }}>
      Email : {email}
    </Text>
</View>

<View style={styles.buttonContainer}>
  <TouchableHighlight
    style={{...styles.logoutButton, backgroundColor: '#2196F3'}}
    onPress={() => {
      dispatch(logout());
      setModalVisible(!modalVisible);
    }}>
    <Text style={styles.textStyle}>Logout </Text>
  </TouchableHighlight>

</View>
</View>


function handleClose() {
  setModalVisible(false);
}

  return (
    <ModalComponent 
      modalActive={modalVisible}
      handleClose={handleClose}
      title={'Profile'}
      fields={fields}
    />
  )}

const styles = StyleSheet.create({
  prfile : {
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'center'
  },
  infoContainer: {
    marginVertical : 20
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoutButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: SIZES.base,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
