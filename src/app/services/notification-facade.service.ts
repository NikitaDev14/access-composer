import { Injectable } from "@angular/core";

import { Access, Tools } from "../models/access.model";
import { NotificationService } from "./notification.service";
import { NotificationTextService } from "./notification-text.service";
import { User } from "../models/profile.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationFacadeService {
  constructor(
    private notificationService: NotificationService,
    private notificationTextService: NotificationTextService,
  ) {
  }

  public notifyAboutClientAccess(newAccess: Access<boolean>, prevAccess: Access<boolean>) {
    Object
      .entries(newAccess)
      .forEach((newAccessEntry: [string, boolean]) => {
        if(newAccessEntry[1] != prevAccess[newAccessEntry[0] as Tools]) {
          this.notificationService.showNotification(
            this.notificationTextService.getClientAccessText(
              newAccessEntry[0] as Tools,
              newAccessEntry[1],
            ),
          );
        }
      });
  }

  public notifyAboutUserAccess(tool: Tools, user: User, isEnabled: boolean) {
    this.notificationService.showNotification(
      this.notificationTextService.getUserAccessText(tool, user.name, isEnabled),
    );
  }
}
