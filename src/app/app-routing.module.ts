import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from "./components/landing/landing.component";
import { DemoComponent } from "./components/demo/demo.component";
import { InitClientFormComponent } from "./components/demo/init-client-form/init-client-form.component";
import { InitClientGuard } from "./guards/init-client.guard";
import { ClientAccessFormComponent } from "./components/demo/client-access-form/client-access-form.component";
import { AccessListComponent } from "./components/demo/access-list/access-list.component";
import { RoutePaths } from "./route-paths.enum";
import { ClientAccessGuard } from "./guards/client-access.guard";

const routes: Routes = [{
  path: RoutePaths.LANDING,
  component: LandingComponent,
}, {
  path: RoutePaths.DEMO,
  redirectTo: 'demo/init-client',
}, {
  path: RoutePaths.DEMO,
  component: DemoComponent,
  children: [{
    path: RoutePaths.INIT_CLIENT,
    component: InitClientFormComponent,
    canActivate: [InitClientGuard],
  }, {
    path: RoutePaths.CLIENT_ACCESS,
    component: ClientAccessFormComponent,
    canActivate: [InitClientGuard],
  }, {
    path: RoutePaths.USERS_ACCESS,
    component: AccessListComponent,
    canActivate: [InitClientGuard, ClientAccessGuard],
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
