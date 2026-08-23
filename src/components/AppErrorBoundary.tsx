import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '../core/theme';
import { PrimaryButton } from './ui';
import { ShieldAlert, RotateCcw } from 'lucide-react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Top-level crash shield. Aetheria holds mood journals and clinical
 * reflections — a render crash must never look like data loss.
 */
export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleRestart = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        <ShieldAlert size={44} color={Colors.reframeGold} />
        <Text style={styles.title}>Something Gloomed Over</Text>
        <Text style={styles.subtitle}>
          Aetheria hit an unexpected error. Your reflections, moods, and progress are
          safely stored on this device — nothing was lost.
        </Text>
        <ScrollView style={styles.detailsBox}>
          <Text style={styles.details}>{this.state.errorMessage}</Text>
        </ScrollView>
        <PrimaryButton label="Try Again" onPress={this.handleRestart} icon={RotateCcw} />
        <TouchableOpacity
          onPress={() => {
            /* last resort */
            this.setState({ hasError: false });
          }}
          style={{ marginTop: Spacing.md }}
        >
          <Text style={styles.secondaryLink}>If problems persist, restart the app.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: 12,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 320,
  },
  detailsBox: {
    maxHeight: 120,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    alignSelf: 'stretch',
  },
  details: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  secondaryLink: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
