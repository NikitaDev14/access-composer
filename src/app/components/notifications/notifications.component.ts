import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { NotificationService } from "../../services/notification.service";
import { AppState } from "../../states";
import { NotificationModel } from "../../models/notifications.model";
import { selectNotifications } from "../../selectors/notification.seceltors";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  public notifications$: Observable<NotificationModel[]>;

  constructor(
    private notificationService: NotificationService,
    private store: Store<AppState>,
  ) {
    this.notifications$ = this.store.select(selectNotifications);
  }

  public trackByFn(index: number, entry: NotificationModel): number {
    return entry.id;
  }
}
