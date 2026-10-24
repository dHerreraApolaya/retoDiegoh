import {
  NavigationContainer,
  type NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../modules/features/authentication';
import { HomeScreen } from '../modules/features/home';
import { useSession } from '../modules/features/session';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoginRoute() {
  const { session } = useSession();
  return <LoginScreen onStartDemoSession={session.startDemoSession} />;
}

function HomeRoute() {
  const { session } = useSession();
  return <HomeScreen onSignOut={session.endSession} />;
}

export function RootNavigator({
  navigationRef,
}: {
  readonly navigationRef?: React.Ref<
    NavigationContainerRef<RootStackParamList>
  >;
}) {
  const { state } = useSession();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.status === 'active' ? (
          <Stack.Group navigationKey="private">
            <Stack.Screen name="Home" component={HomeRoute} />
          </Stack.Group>
        ) : (
          <Stack.Group navigationKey="public">
            <Stack.Screen name="Login" component={LoginRoute} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
