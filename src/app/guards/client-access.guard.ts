import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { Store } from "@ngrx/store";

import { AppState } from "../states";
import { selectIsInitializedClientAccess } from "../selectors/client.selectors";
import { RoutePaths } from "../route-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class ClientAccessGuard  {
  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectIsInitializedClientAccess).pipe(
      first(),
      map((isInitializedClientAccess: boolean) => {
        if (!isInitializedClientAccess) {
          return this.router.createUrlTree([RoutePaths.DEMO, RoutePaths.CLIENT_ACCESS]);
        }

        return true;
      }),
    );
  }
}
