import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProviders } from './src/app/providers/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <RootNavigator />
        </SafeAreaView>
      </AppProviders>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
