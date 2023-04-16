import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';


export default function ModalComponent({
  title,
  fields,
  okButtonText,
  modalActive,
  handleClose,
  onOk,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalActive}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity onPress={handleClose}>
                <Image source={icons.cancel} style={styles.icons} />
              </TouchableOpacity>
            </View>
            <View style={styles.fieldsContainer}>
                      <Text>{fields}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  modalView: {
    maxHeight: Dimensions.get('window').height / 1.5,
    minHeight : Dimensions.get('window').height / 4,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.blue,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    width: '100%',
    height: SIZES.padding2,
  },

  title: {
    marginHorizontal: 5,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },

  icons: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
    marginRight: 7.5,
  },

  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },


});
