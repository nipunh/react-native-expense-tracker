import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import ModalComponent from '../components/Modal';
import DatePicker from 'react-native-datepicker';
import { addExpense, reset } from '../redux/expense/action';

export default function AddExpense({setAddModalVisible, addModalVisible, uid}) {
  const [expense, SetExpense] = useState({
    title: '',
    description: '',
    location: '',
    total: null,
    category: '',
    status: 0,
    date: new Date(),
    id: Math.random(),
  });

  const dispatch = useDispatch();

  const onRecordChange = (name, value) => {
    SetExpense((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const items = [
    {
      label: 'Education',
      value: 'Education',
    },
    {
      label: 'Beauty & Care',
      value: 'Beauty & Care',
    },
    {
      label: 'Clothing & Accessories',
      value: 'Clothing & Accessories',
    },
    {
      label: 'Electronics',
      value: 'Electronics',
    },
    {
      label: 'Sports & Fitness',
      value: 'Sports & Fitness',
    },
    {
      label: 'Food & Nutrition',
      value: 'Food & Nutrition',
    },
  ];

  let fields = 
        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText = {(value) => onRecordChange('title', value)}
            placeholder="Expense title"
            autoCapitalize="words"
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={(value) => onRecordChange('description', value)}
            placeholder="Expense description"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Total amount"
            onChangeText = {(value) => onRecordChange('total', parseInt(value))}
            // secureTextEntry={true}
          />

          <DropDownPicker
            items={items}
            containerStyle={{height: 70, width: '86%'}}
            placeholder="Select expense category"
            style={styles.inputBox}
            onChangeItem={ item => onRecordChange('category', item.value)}
          />

           <DatePicker
            style={{
              marginTop: 20,
              width: 300,
              borderRadius: 5,
              backgroundColor: COLORS.lightGray,
            }}
            date={expense.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
              },
            }}
            onDateChange={(value) => onRecordChange('date',value)}
          />


          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.closeButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

  function handleSubmit() {
    dispatch(addExpense(expense, uid));
    setAddModalVisible(false);
  }

  function handleClose() {
    setAddModalVisible(false);
  }

  return (
    <ModalComponent
      modalActive={addModalVisible}
      handleClose={handleClose}
      title={'Add Expense'}
      fields={fields}
      okButtonText={'Submit'}
      onOk={handleSubmit}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 20,
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: SIZES.base,
  },

  closeButton: {
    textAlign: 'center',
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    padding: SIZES.base,
    margin: SIZES.base,
    width: 70,
  },
});
