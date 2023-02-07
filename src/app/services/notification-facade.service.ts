import { Injectable } from "@angular/core";

import { Access, Tools } from "../models/access.model";
import { NotificationService } from "./notification.service";
import { NotificationTextService } from "./notification-text.service";
import { User } from "../models/profile.model";
import { NotificationModel } from "../models/notifications.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationFacadeService {
  constructor(
    private notificationService: NotificationService,
    private notificationTextService: NotificationTextService,
  ) {
  }

  public notificationsFactory(newAccess: Access<boolean>, prevAccess: Access<boolean>): NotificationModel[] {
    return Object
      .entries(newAccess)
      .filter((newAccessEntry: [string, boolean]) => newAccessEntry[1] != prevAccess[newAccessEntry[0] as Tools])
      .map((newAccessEntry: [string, boolean]) => {
        return {
          id: this.notificationService.getNewNotificationId(),
          text: this.notificationTextService.getClientAccessText(
            newAccessEntry[0] as Tools,
            newAccessEntry[1],
          ),
        };
      });
  }

  public notificationFactory(tool: Tools, user: User, isEnabled: boolean): NotificationModel {
    return {
      id: this.notificationService.getNewNotificationId(),
      text: this.notificationTextService.getUserAccessText(tool, user.name, isEnabled),
    };
  }
}
