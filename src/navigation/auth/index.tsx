import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../../screens/auth/signin';
import { RecoveryScreen } from '../../screens/auth/recovery';
import { SignupScreen } from '../../screens/auth/signup';
import { ResetScreen } from '../../screens/auth/reset';
import { SmsCodeScreen } from '../../screens/auth/sms-code';
import { AuthStackParamList } from './types/auth-stack-param-list';

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SmsCode"
        options={{
          headerShown: false,
        }}
        component={SmsCodeScreen}
      />
      <AuthStack.Screen
        name="Recovery"
        options={{
          headerShown: false,
        }}
        component={RecoveryScreen}
      />
      <AuthStack.Screen
        name="Registration"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Reset"
        component={ResetScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};
