import React from 'react';

import {
  View
} from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { useAuth } from '../../hooks/auth'

import { styles } from './styles';

export function SigninBox(){
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button 
        icon="github"
        color={COLORS.BLACK_SECONDARY}
        backgroundColor={COLORS.YELLOW}
        title='Entrar com o Github'
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}