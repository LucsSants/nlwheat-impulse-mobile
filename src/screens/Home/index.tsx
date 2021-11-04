import React from 'react';
import { Header } from '../../components/Header';


import {
  View, KeyboardAvoidingView, Platform
} from 'react-native';

import { MessagesList } from '../../components/MessagesList';

import { styles } from './styles';
import { SigninBox } from '../../components/SigninBox';
import { SendMessageForm } from '../../components/SendMessageForm';
import { useAuth } from '../../hooks/auth';

export function Home(){
  
  const { user } = useAuth()

  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
      <Header/>
      <MessagesList/>

      {user ? <SendMessageForm/> : <SigninBox/>}
    </View>
    </KeyboardAvoidingView>
  );
}
