import React, {useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  Button
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { COLORS, icons, SIZES } from '../constants';
import {reset, signupUser} from '../redux/auth/actions';

export default function Signup({navigation}) {
  var notify;

  const {error, errorMessage, success, successMessage} = useSelector(
    (state) => state.Auth,
  );

  const dispatch = useDispatch();

  const [credentails, setCredentails] = useState({
    name :'',
    email: '',
    password: '',
  });

  function onRecordChange(name, value) {
    setCredentails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSignup() {
    dispatch(signupUser(credentails));
    setCredentails({name : '', email: '', password: ''});
  }

  function renderNavBar() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.iconContainerLeft}
          onPress={() => {navigation.navigate('login')}}>
          <Image source={icons.back_arrow} style={styles.icons} />
        </TouchableOpacity>
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', errorMessage, [{ text : 'Ok', onPress : () => {dispatch(reset())}}]);
  }

  if (success) {
    Alert.alert('Success', successMessage, [{ text : 'Ok', onPress : () => {dispatch(reset())}}]);
  }

  return (
    <View style={styles.container}>
      {notify}
      {renderNavBar()}
      <TextInput
        style={styles.inputBox}
        value={credentails.name}
        onChangeText={(name) => onRecordChange('name', name)}
        placeholder="User Name"
        autoCapitalize="words"
      />
      <TextInput
        style={styles.inputBox}
        value={credentails.email}
        onChangeText={(email) => onRecordChange('email', email)}
        placeholder="Enter Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={credentails.password}
        onChangeText={(password) => onRecordChange('password', password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            handleSignup();
          }}>
          Signup
        </Text>
      </TouchableOpacity>
      <Button onPress={()=>{navigation.navigate('login')}} title="Already have an account? Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    padding: 10,
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
  iconContainerLeft: {
    justifyContent: 'center',
    width: 50,
  },
  iconContainerRight: {
    justifyContent: 'center',
    width: 50,
    alignItems: 'flex-end',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
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
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
});
