import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { OFFLINE_CRISIS_DIRECTORY } from '../../core/security/crisisDirectory';
import { Colors, Spacing } from '../../core/theme';
import { ShieldAlert, Phone, MessageSquare, Globe, X, Heart } from 'lucide-react-native';

interface CrisisBridgeModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CrisisBridgeModal: React.FC<CrisisBridgeModalProps> = ({ visible, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');

  const contact =
    OFFLINE_CRISIS_DIRECTORY.find((c) => c.countryCode === selectedCountry) ||
    OFFLINE_CRISIS_DIRECTORY[0];

  const handleCall = (num: string) => {
    Linking.openURL(`tel:${num}`);
  };

  const handleSms = (num: string) => {
    Linking.openURL(`sms:${num}`);
  };

  const handleWeb = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <ShieldAlert size={20} color={Colors.compassionPink} />
              <Text style={styles.title}>Emergency Crisis Bridge</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.message}>
            You are not alone. Free, confidential, 24/7 human support is available immediately:
          </Text>

          {/* Country Selection */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.countryRow}
          >
            {OFFLINE_CRISIS_DIRECTORY.map((c) => {
              const isSelected = c.countryCode === selectedCountry;
              return (
                <TouchableOpacity
                  key={c.countryCode}
                  style={[styles.countryChip, isSelected && styles.countryChipActive]}
                  onPress={() => setSelectedCountry(c.countryCode)}
                >
                  <Text style={[styles.countryChipText, isSelected && styles.countryChipTextActive]}>
                    {c.countryName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Active Contact Card */}
          <View style={styles.contactBox}>
            <Text style={styles.helplineName}>{contact.helplineName}</Text>
            <Text style={styles.hoursText}>{contact.availableHours}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => handleCall(contact.phoneNumber)}
                accessibilityRole="button"
                accessibilityLabel={`Call ${contact.helplineName} at ${contact.phoneNumber}`}
              >
                <Phone size={16} color="#FFFFFF" />
                <Text style={styles.callBtnText}>Call {contact.phoneNumber}</Text>
              </TouchableOpacity>

              {contact.smsNumber && (
                <TouchableOpacity
                  style={styles.smsBtn}
                  onPress={() => handleSms(contact.smsNumber!)}
                  accessibilityRole="button"
                  accessibilityLabel={`Text ${contact.helplineName} at ${contact.smsNumber}`}
                >
                  <MessageSquare size={16} color={Colors.clarityMana} />
                  <Text style={styles.smsBtnText}>Text {contact.smsNumber}</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.webBtn} onPress={() => handleWeb(contact.website)}>
              <Globe size={14} color={Colors.textSecondary} />
              <Text style={styles.webBtnText}>Open {contact.website}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groundingTip}>
            <Heart size={14} color={Colors.vitalityGreen} />
            <Text style={styles.groundingText}>
              Grounding reminder: Place both feet flat on the floor and take 3 deep, slow breaths.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.compassionPink,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  message: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  countryRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: Spacing.md,
  },
  countryChip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  countryChipActive: {
    borderColor: Colors.compassionPink,
    backgroundColor: 'rgba(244, 114, 182, 0.15)',
  },
  countryChipText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  countryChipTextActive: {
    color: Colors.compassionPink,
  },
  contactBox: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  helplineName: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  hoursText: {
    color: Colors.vitalityGreen,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  callBtn: {
    flex: 1,
    backgroundColor: Colors.dangerRed,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  callBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  smsBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.clarityMana,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  smsBtnText: {
    color: Colors.clarityMana,
    fontWeight: '700',
    fontSize: 13,
  },
  webBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  webBtnText: {
    color: Colors.textSecondary,
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  groundingTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    padding: Spacing.sm,
    borderRadius: 10,
    gap: 6,
  },
  groundingText: {
    color: Colors.textSecondary,
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
});
