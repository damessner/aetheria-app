import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppErrorBoundary } from './src/components/AppErrorBoundary';
import { Colors } from './src/core/theme';

export default function App() {
  return (
    <AppErrorBoundary>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={Colors.background} />
        <AppNavigator />
      </View>
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
