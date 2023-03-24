import { Component } from '@angular/core';
import { Observable } from "rxjs";

import { NotificationService } from "../../services/notification.service";
import { NotificationModel } from "../../models/notifications.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  public notifications$: Observable<NotificationModel[]>;

  constructor(
    private notificationService: NotificationService,
  ) {
    this.notifications$ = this.notificationService.getNotifications$();
  }

  public trackByFn(index: number, entry: NotificationModel): number {
    return entry.id;
  }

  public hideNotification(notification: NotificationModel) {
    this.notificationService.forceHideNotification(notification);
  }
}
