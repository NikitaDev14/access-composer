import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Access, Tools, UpdateAccessActionPayload } from '../../../models/access.model';
import { AppState } from "../../../states";
import { selectUsersAccess } from "../../../selectors/user.selectors";
import { selectClientAccess } from "../../../selectors/client.selectors";
import { UserAccessState } from "../../../states/users.state";
import { UpdateUserAccessAction } from "../../../actions/users.action";
import { KeyValue } from "@angular/common";

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent implements OnInit {
  public readonly TOOLS = Tools;

  public clientAccess$!: Observable<Access<boolean>>;
  public usersAccess$!: Observable<UserAccessState[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.clientAccess$ = this.store.select(selectClientAccess);
    this.usersAccess$ = this.store.select(selectUsersAccess);
  }

  public usersAccessTrackFn(index: number, item: UserAccessState): number {
    return item.user.id;
  }

  public clientAccessTrackFn(index: number, item: KeyValue<string, Access<boolean>>): string {
    return item.key;
  }

  public updateAccess($event: UpdateAccessActionPayload) {
    this.store.dispatch(new UpdateUserAccessAction($event));
  }
}
