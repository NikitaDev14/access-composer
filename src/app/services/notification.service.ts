import { Injectable } from "@angular/core";

import { BehaviorSubject, delay, filter, first, map, Observable, of, race, Subject } from "rxjs";
import { NotificationModel, NotificationsList } from "../models/notifications.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private NOTIFICATION_ID: number = 0;

  private notifications$: BehaviorSubject<NotificationModel[]> = new BehaviorSubject([]);

  private forceHideNotificationSubject$: Subject<NotificationModel> = new Subject();

  public static NOTIFICATIONS_DISPLAY_TIME = 4000 //milliseconds

  public getNewNotificationId(): number {
    return ++this.NOTIFICATION_ID;
  }

  private hideNotification(notification: NotificationModel): void {
    race([
      of(notification).pipe(
        delay(NotificationService.NOTIFICATIONS_DISPLAY_TIME),
      ),
      this.forceHideNotificationSubject$.pipe(
        filter((forceHideNotification: NotificationModel) =>
          forceHideNotification.id === notification.id,
        ),
      ),
    ]).pipe(
      first(),
    ).subscribe((notificationToHide: NotificationModel) => {
      const notificationList: NotificationsList = new Map([
        ...this.notifications$.getValue().entries(),
      ]);

      notificationList.delete(notificationToHide.id);

      this.notifications$.next(notificationList);
    });
  }

  public forceHideNotification(notification: NotificationModel): void {
    this.forceHideNotificationSubject$.next(notification);
  }

  public showNotification(notification: NotificationModel): void {
    const newNotificationsList: NotificationsList = new Map([
      ...this.notifications$.getValue().entries(),
      [
        notification.id,
        notification.text,
      ],
    ]);

    this.notifications$.next(newNotificationsList);

    this.hideNotification(notification);
  }

  public getNotifications$(): Observable<NotificationModel[]> {
    return this.notifications$.pipe(
      map((notifications: NotificationsList) => {
        return [...notifications.entries()].map((value: [NotificationModel['id'], NotificationModel['']]))
      }),
    );
  }
}
