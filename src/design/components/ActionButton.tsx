import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  readonly label: string;
  readonly onPress: () => void;
  readonly testID: string;
};

/** Interim platform-only UI: no approved brand tokens or visual parity claimed. */
export function ActionButton({ label, onPress, testID }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      testID={testID}
      style={styles.action}
    >
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: {
    // Shared 48-point minimum also meets the project's Android/iOS touch baseline.
    minHeight: 48,
    justifyContent: 'center',
  },
});
