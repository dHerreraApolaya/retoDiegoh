import { Text, View } from 'react-native';
import { ActionButton } from '../../../../design/components/ActionButton';
import { LoginTestIds } from './LoginTestIds';

export function LoginScreen({
  onStartDemoSession,
}: {
  readonly onStartDemoSession: () => void;
}) {
  return (
    <View testID={LoginTestIds.screen}>
      <Text accessibilityRole="header">Login</Text>
      <Text>Acceso de prueba local, sin autenticación real.</Text>
      <ActionButton
        label="Iniciar sesión de prueba"
        onPress={onStartDemoSession}
        testID={LoginTestIds.startDemoSession}
      />
    </View>
  );
}
