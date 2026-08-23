import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { UpdateManager } from './UpdateManager';
import { OTAReleaseInfo } from '../types';
import { Colors, Spacing } from '../theme';
import { Sparkles, Download, X } from 'lucide-react-native';

export const UpdateBanner: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<OTAReleaseInfo | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    UpdateManager.checkForUpdates().then((info) => {
      if (info.isUpdateAvailable) {
        setUpdateInfo(info);
      }
    });
  }, []);

  if (!updateInfo || !updateInfo.isUpdateAvailable || isDismissed) {
    return null;
  }

  const handleUpdatePress = async () => {
    if (updateInfo.downloadUrl) {
      await Linking.openURL(updateInfo.downloadUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Sparkles size={20} color={Colors.reframeGold} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Update Available ({updateInfo.releaseTag})</Text>
          <Text style={styles.body} numberOfLines={1}>{updateInfo.releaseNotes}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
          <Download size={14} color="#0A0A0E" />
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsDismissed(true)}>
          <X size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1B2E',
    borderColor: Colors.reframeGold,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  textContainer: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  title: {
    color: Colors.reframeGold,
    fontWeight: '700',
    fontSize: 14,
  },
  body: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  updateButtonText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 4,
  },
  closeButton: {
    padding: 4,
  },
});
