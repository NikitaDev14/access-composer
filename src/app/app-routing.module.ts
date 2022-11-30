import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from "./components/landing/landing.component";
import { DemoComponent } from "./components/demo/demo.component";

const routes: Routes = [{
  path: '',
  component: LandingComponent,
}, {
  path: 'demo',
  component: DemoComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
