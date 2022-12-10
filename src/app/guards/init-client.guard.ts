import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { Store } from "@ngrx/store";

import { AppState } from "../states";
import { selectIsClientInitialized } from "../selectors/client.selectors";
import { RoutePaths } from "../route-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class InitClientGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | boolean {
    switch (route.routeConfig?.path) {
      case RoutePaths.CLIENT_ACCESS:
      case RoutePaths.USERS_ACCESS: {
        return this.accessRoutesGuard();
      }

      default:
        return true;
    }
  }

  private accessRoutesGuard(): Observable<boolean | UrlTree> {
    return this.store.select(selectIsClientInitialized).pipe(
      first(),
      map((isClientInitialized: boolean) => {
        if (isClientInitialized) {
          return true;
        }

        return this.router.createUrlTree([RoutePaths.DEMO, RoutePaths.INIT_CLIENT]);
      }),
    );
  }
}
