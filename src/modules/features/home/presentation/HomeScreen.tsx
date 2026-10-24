import { Text, View } from 'react-native';
import { ActionButton } from '../../../../design/components/ActionButton';
import { HomeTestIds } from './HomeTestIds';

export function HomeScreen({ onSignOut }: { readonly onSignOut: () => void }) {
  return (
    <View testID={HomeTestIds.screen}>
      <Text accessibilityRole="header">Home</Text>
      <Text>La sesión de prueba dura cinco minutos desde su inicio.</Text>
      <ActionButton
        label="Cerrar sesión"
        onPress={onSignOut}
        testID={HomeTestIds.signOut}
      />
    </View>
  );
}
