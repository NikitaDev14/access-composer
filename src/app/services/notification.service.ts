import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private static NOTIFICATION_ID: number = 0;

  public static NOTIFICATIONS_DISPLAY_TIME = 4000 //milliseconds

  public getNewNotificationId(): number {
    return ++NotificationService.NOTIFICATION_ID;
  }
}
