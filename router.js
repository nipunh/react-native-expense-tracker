import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Login from './screens/Login';
import {useSelector} from 'react-redux';
import Loading from './screens/Loading';
import Signup from './screens/Signup';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

export default function Routes() {
  const {loading, uid} = useSelector((state) => state.Auth);

  if (loading) {
    // We haven't finished checking for the token yet
    return <Loading />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'login'}>
      {uid == null || uid == '' ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </>
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
}
