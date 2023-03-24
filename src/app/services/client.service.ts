import { Injectable } from "@angular/core";
import { BehaviorSubject, first, map, mergeMap, Observable } from "rxjs";

import { ClientAccessState, initialClientState } from "../states/client.state";
import { Access, ClientAccessItem } from "../models/access.model";
import { AccessService } from "./access.service";
import { NotificationFacadeService } from "./notification-facade.service";
import { NotificationService } from "./notification.service";
import { NotificationModel } from "../models/notifications.model";
import { ClientAccessInitializedAction } from "../actions/client.actions";
import { UserAccessInitializedAction } from "../actions/users.action";
import { UsersService } from "./users.service";

@Injectable()
export class ClientService {
  private clientState$: BehaviorSubject<ClientAccessState> = new BehaviorSubject(initialClientState);

  constructor(
    private notificationFacadeService: NotificationFacadeService,
    private accessService: AccessService,
    private notificationService: NotificationService,
    private usersService: UsersService,
  ) { }

  public initializeAccess(access: Access<ClientAccessItem>): void {
    this.clientState$.next({
      ...this.clientState$.getValue(),
      isLoading: true,
    });

    this.accessService.updateAccess(2000).pipe(
      first(),
    ).subscribe(() => {
      this.notificationFacadeService
        .notificationsFactory(access, this.clientState$.getValue().access)
        .forEach((notification: NotificationModel) => {
          this.notificationService.showNotification(notification);
        });

      this.clientState$.next({
        ...this.clientState$.getValue(),
        access: access,
        isLoading: false,
      });

      this.usersService.setUserAccess(access);
    });
  }

  public isClientAccessLoading$(): Observable<boolean> {
    return this.clientState$.pipe(
      map((clientState: ClientAccessState) =>
        clientState.isLoading,
      ),
    );
  }

  public getClientAccess(): Access<ClientAccessItem> {
    return this.clientState$.getValue().access;
  }
}
