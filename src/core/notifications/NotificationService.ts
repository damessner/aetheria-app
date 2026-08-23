import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Real local notification scheduling for book routines.
 * Android: notifications fire without extra permission; we still request
 * permissions gracefully and degrade to silent no-ops when denied.
 */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    // Fields for newer expo-notifications SDKs:
    shouldShowBanner: true,
    shouldShowList: true,
  }) as never,
});

export class NotificationServiceImpl {
  /** Request permission; returns whether notifications may be shown */
  async requestPermissions(): Promise<boolean> {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (current.status === 'undetermined' || !current.canAskAgain === false) {
      const req = await Notifications.requestPermissionsAsync();
      return req.granted;
    }
    return false;
  }

  async configureAndroidChannel(): Promise<void> {
    if (Platform.OS !== 'android') return;
    await Notifications.setNotificationChannelAsync('routines', {
      name: 'Book Routines',
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: '#FBBF24',
    });
  }

  /**
   * Schedule a daily repeating reminder. Returns a platform notification id
   * (or null when permission was denied / time unparseable).
   */
  async scheduleDailyReminder(
    routineId: string,
    title: string,
    body: string,
    timeStr: string
  ): Promise<string | null> {
    const granted = await this.requestPermissions();
    if (!granted) return null;

    await this.configureAndroidChannel();

    const triggerDate = this.parseTimeToNextOccurrence(timeStr);
    if (!triggerDate) return null;

    return Notifications.scheduleNotificationAsync({
      content: { title, body, sound: false },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'routines',
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
      },
      identifier: `routine_${routineId}`,
    });
  }

  async cancelReminder(routineId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(`routine_${routineId}`);
    } catch {
      /* nothing scheduled — fine */
    }
  }

  /** Parse "07:30" / "7:30 AM" / "19:45" into the next occurrence Date */
  parseTimeToNextOccurrence(timeStr: string): Date | null {
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    if (hours > 23 || minutes > 59) return null;

    const next = new Date();
    next.setHours(hours, minutes, 0, 0);
    if (next.getTime() <= Date.now()) {
      next.setDate(next.getDate() + 1); // schedule tomorrow
    }
    return next;
  }
}

export const NotificationService = new NotificationServiceImpl();
