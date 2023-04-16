import React, { useState } from 'react'
import { Button, TouchableOpacity, TextInput, StyleSheet, View, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { reset, loginUser } from '../redux/auth/actions';

export default function login({navigation}) {

    const {error, errorMessage, success, successMessage} = useSelector(
        (state) => state.Auth,
      );
    
    const dispatch = useDispatch();

    const [credentails, setCredentails] = useState({
        email : '',
        password : ''
    })

    function onRecordChange(name, value){
        setCredentails((prevState)=>{
            return{
                ...prevState,
                [name] : value
            }
        })
    }

    function handleLogin(){
        dispatch(loginUser(credentails));
        setCredentails({email : '', password : ''})
    }

    if (error) {
        Alert.alert('Error', errorMessage, [{ text : 'Ok', onPress : () => {dispatch(reset())}}]);
      }
    
    if(success) {
        Alert.alert('Success', successMessage, [{ text : 'Ok', onPress : () => {dispatch(reset())}}]);
    }

    return (
        <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={credentails.email}
                    onChangeText={email => onRecordChange('email', email )}
                    placeholder='Enter Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={credentails.password}
                    onChangeText={password => onRecordChange('password', password)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>{handleLogin()}}>Login</Text>
                </TouchableOpacity>
                <Button onPress={()=>{navigation.navigate('signup')}} title="Don't have an account yet? Sign up" />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
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
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})