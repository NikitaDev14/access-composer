import { Component } from '@angular/core';

import { RoutePaths } from "../../route-paths.enum";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public readonly ROUTE_PATHS = RoutePaths;
}
