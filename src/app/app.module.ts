import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessListComponent } from './components/demo/access-list/access-list.component';
import { InitClientFormComponent } from './components/demo/init-client-form/init-client-form.component';
import { reducers } from "./reducers";
import { LandingComponent } from './components/landing/landing.component';
import { DemoComponent } from './components/demo/demo.component';
import { ClientAccessFormComponent } from './components/demo/client-access-form/client-access-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ClientEffects } from "./effects/client.effects";
import { LoaderComponent } from './components/loader/loader.component';
import { AccessControlComponent } from './components/demo/access-control/access-control.component';
import { UserEffects } from "./effects/user.effects";
import { FilterPipe } from './pipes/filter.pipe';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationEffects } from "./effects/notification.effects";

@NgModule({
  declarations: [
    AppComponent,
    AccessListComponent,
    InitClientFormComponent,
    LandingComponent,
    DemoComponent,
    ClientAccessFormComponent,
    LoaderComponent,
    AccessControlComponent,
    FilterPipe,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([ClientEffects, UserEffects, NotificationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
