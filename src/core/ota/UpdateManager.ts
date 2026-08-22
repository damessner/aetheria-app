import * as Updates from 'expo-updates';
import { Platform } from 'react-native';
import { OTAReleaseInfo } from '../types';
import { Database } from '../database/db';

class UpdateManagerService {
  private currentVersion = '1.0.0';

  /**
   * Check for both GitHub Releases (for APK downloads) and Expo OTA updates (for JS bundle patches)
   */
  async checkForUpdates(): Promise<OTAReleaseInfo> {
    try {
      // 1. Check Expo Updates (OTA)
      if (!__DEV__ && Updates.isEnabled) {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          return {
            version: 'OTA Patch Available',
            releaseTag: 'ota-latest',
            releaseNotes: 'Performance and content patch ready for instant install.',
            publishedAt: new Date().toISOString(),
            isUpdateAvailable: true,
          };
        }
      }

      // 2. Check GitHub Releases API for APK releases
      const userState = await Database.getUserState();
      const repo = userState.preferences.githubRepo || 'damessner/aetheria-app';
      
      const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (response.ok) {
        const data = await response.json();
        const latestTag = (data.tag_name || '').replace(/^v/, '');
        const hasNewerVersion = this.compareVersions(latestTag, this.currentVersion) > 0;

        const apkAsset = data.assets?.find((a: any) => a.name.endsWith('.apk'));

        return {
          version: latestTag || this.currentVersion,
          releaseTag: data.tag_name || 'v1.0.0',
          releaseNotes: data.body || 'New features and clinical improvements.',
          publishedAt: data.published_at || new Date().toISOString(),
          downloadUrl: apkAsset ? apkAsset.browser_download_url : data.html_url,
          isUpdateAvailable: hasNewerVersion,
        };
      }
    } catch (e) {
      console.warn('[UpdateManager] Could not query remote release', e);
    }

    return {
      version: this.currentVersion,
      releaseTag: `v${this.currentVersion}`,
      releaseNotes: 'You are on the latest version.',
      publishedAt: new Date().toISOString(),
      isUpdateAvailable: false,
    };
  }

  async applyOtaUpdate(): Promise<void> {
    if (!__DEV__ && Updates.isEnabled) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }
}

export const UpdateManager = new UpdateManagerService();
