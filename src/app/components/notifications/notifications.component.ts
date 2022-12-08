import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  public notifications$: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
  ) {
    this.notifications$ = this.notificationService.getNotifications();
  }
}
