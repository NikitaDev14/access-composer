import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";

import { RoutePaths } from "./route-paths.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    protected readonly ROUTE_PATHS = RoutePaths;

    public isDemoLinkShown$!: Observable<boolean>;

    constructor(
      private router: Router,
    ) { }

  ngOnInit() {
      this.isDemoLinkShown$ = this.router.events.pipe(
        filter((routerEvent: any) => routerEvent instanceof NavigationEnd),
        map((routerEvent: NavigationEnd) => {
          return !routerEvent.urlAfterRedirects.includes(RoutePaths.DEMO);
        }),
      );
  }
}
