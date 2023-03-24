import { Injectable } from "@angular/core";
import { Access, ClientAccessItem, Tools } from "../models/access.model";
import { initialUsersState, UserAccessItemState, UserAccessState, UsersState } from "../states/users.state";
import { Router } from "@angular/router";
import { RoutePaths } from "../route-paths.enum";

@Injectable()
export class UsersService {
  private usersState: UsersState = initialUsersState;

  constructor(
    private router: Router,
  ) { }

  public setUserAccess(access: Access<ClientAccessItem>): void {
    this.usersState = [
      ...this.usersState.map((userAccess: UserAccessState) => {
        return {
          ...userAccess,
          access: Object.fromEntries(
            Object.entries(userAccess.access).map((userAccessEntry: [string, UserAccessItemState]): [keyof Tools, UserAccessItemState] => {
              return [
                userAccessEntry[0] as keyof Tools,
                {
                  hasAccess: userAccessEntry[1].hasAccess,
                  isLoading: false,
                },
              ];
            }),
          ) as Access<UserAccessItemState>,
        };
      }),
    ];

    this.router.navigate([RoutePaths.DEMO, RoutePaths.USERS_ACCESS]);
  }
}
