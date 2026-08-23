import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Colors, Spacing } from '../../core/theme';
import { PrimaryButton, SectionCard } from '../../components';
import { ShieldAlert, HeartHandshake, BookOpen } from 'lucide-react-native';

interface DisclaimerScreenProps {
  onAcknowledge: () => void;
}

/**
 * One-time medical disclaimer shown before first app use.
 * Aetheria is a self-help tool, not a medical device or therapist.
 */
export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onAcknowledge }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ShieldAlert size={44} color={Colors.reframeGold} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>Before You Begin</Text>
        <Text style={styles.subtitle}>Please read carefully — it matters.</Text>

        <SectionCard accent="gold" style={{ marginTop: Spacing.lg }}>
          <Text style={styles.body}>
            <Text style={styles.bold}>Aetheria is not therapy or medical treatment.</Text>{' '}
            It is a self-help game built on evidence-informed techniques (CBT, Behavioral
            Activation, Compassion-Focused Therapy). It is{' '}
            <Text style={styles.bold}>not a substitute</Text> for diagnosis, therapy,
            medication, or advice from a qualified healthcare professional.
          </Text>
        </SectionCard>

        <SectionCard accent="red" style={{ marginTop: Spacing.md }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <HeartHandshake size={18} color={Colors.distortionRed} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.body, { color: Colors.textPrimary }]}>
                If you are in crisis or having thoughts of harming yourself, stop and
                reach out now:
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL('tel:988')}>
                <Text style={styles.link}>Call or text 988 (US Suicide &amp; Crisis Lifeline)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://findahelpline.com')}>
                <Text style={styles.link}>Find a helpline in your country</Text>
              </TouchableOpacity>
              <Text style={[styles.body, { marginTop: 6 }]}>
                In immediate danger, contact your local emergency number.
              </Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard style={{ marginTop: Spacing.md }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <BookOpen size={18} color={Colors.clarityMana} />
            <Text style={styles.body}>
              Your reflections, moods, and AI conversations are stored only on this device
              (plus your own optional Gemini API usage). No clinical data leaves your phone
              except prompts you send to Google Gemini yourself. If you ever feel worse while
              using the app, please talk to a professional.
            </Text>
          </View>
        </SectionCard>

        <Text style={styles.footerNote}>
          By continuing you confirm you are 18+ (or have guardian consent) and understand
          that Aetheria does not provide medical care.
        </Text>

        <PrimaryButton
          label="I Understand — Enter Aetheria"
          onPress={onAcknowledge}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  body: {
    color: Colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 18,
  },
  bold: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  link: {
    color: Colors.clarityMana,
    fontSize: 12.5,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  footerNote: {
    color: Colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    marginVertical: Spacing.lg,
  },
});
